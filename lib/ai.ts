'use client'

import { getApp, getApps, initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  InferenceMode,
  InferenceSource,
} from 'firebase/ai'
import { redactPII } from '@/lib/redact'
import type { PrivacyPreferences } from '@/components/privacy-preferences'

export type AnalysisTask = 'summary' | 'subscriptions' | 'charge'
export type AnalysisResult = { result: string; source: 'on-device' | 'cloud'; redactions: string[] }

const CLOUD_MODEL = 'gemini-3.8-flash'
type AppCheckWindow = Window & { __PAISAGUARD_APPCHECK_INITIALIZED__?: boolean }

function getFirebaseApp() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }
  const appCheckSiteKey = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY

  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
    throw new Error('Add your Firebase web app configuration in the project environment variables to enable AI analysis.')
  }
  if (!appCheckSiteKey) {
    throw new Error('Add NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY and register the web app with Firebase App Check to enable AI analysis.')
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

  const appCheckWindow = window as AppCheckWindow & { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean }
  if (!appCheckWindow.__PAISAGUARD_APPCHECK_INITIALIZED__) {
    if (process.env.NODE_ENV !== 'production') {
      appCheckWindow.FIREBASE_APPCHECK_DEBUG_TOKEN = true
    }
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    })
    appCheckWindow.__PAISAGUARD_APPCHECK_INITIALIZED__ = true
  }

  return app
}

function createPrompt(task: AnalysisTask, sanitizedText: string) {
  const instructions: Record<AnalysisTask, string> = {
    summary: 'Summarize the spending, identify the largest categories and notable trends. Do not invent amounts or transactions.',
    subscriptions: 'Identify likely recurring subscriptions, their amounts and cadence. Distinguish confirmed facts from estimates.',
    charge: 'Explain the likely merchant and transaction in plain language. Do not claim certainty beyond the statement details.',
  }

  return [
    'You are PaisaGuard, a careful financial-information assistant. Give concise, useful explanations, not personalized investment, tax, or legal advice. Use Indian rupees when present. Never repeat personal identifiers.',
    instructions[task],
    'Analyze only the statement text below. If there is not enough information, say so.',
    'Statement text:',
    sanitizedText,
  ].join('\n\n')
}

export async function analyze(
  text: string,
  task: AnalysisTask,
  preferences: PrivacyPreferences,
): Promise<AnalysisResult> {
  const sanitized = redactPII(text)
  const overDeviceLimit = text.length > preferences.maxOnDeviceInputLength

  if (!preferences.preferOnDevice && !preferences.allowCloudFallback) {
    throw new Error('Enable on-device processing or cloud fallback in Privacy settings to analyze this statement.')
  }
  if (overDeviceLimit && !preferences.allowCloudFallback) {
    throw new Error('This statement is over your on-device length limit. Allow cloud fallback or increase the input limit in Privacy settings.')
  }

  let mode: InferenceMode
  if (overDeviceLimit) {
    mode = InferenceMode.ONLY_IN_CLOUD
  } else if (preferences.preferOnDevice && preferences.allowCloudFallback) {
    mode = InferenceMode.PREFER_ON_DEVICE
  } else if (preferences.preferOnDevice) {
    mode = InferenceMode.ONLY_ON_DEVICE
  } else {
    mode = InferenceMode.ONLY_IN_CLOUD
  }

  const app = getFirebaseApp()
  const ai = getAI(app, { backend: new GoogleAIBackend() })
  const model = getGenerativeModel(ai, { mode, inCloudParams: { model: CLOUD_MODEL } })

  if (mode !== InferenceMode.ONLY_IN_CLOUD) {
    void model.initializeDeviceModel().catch(() => undefined)
  }

  const response = await model.generateContent(createPrompt(task, sanitized.text))
  const output = response.response.text().trim()
  if (!output) throw new Error('The AI returned an empty response. Please try again.')

  return {
    result: output,
    source: response.response.inferenceSource === InferenceSource.ON_DEVICE ? 'on-device' : 'cloud',
    redactions: sanitized.redactions,
  }
}
