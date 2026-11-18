import { redactPII } from '@/lib/redact'

export type AnalysisTask = 'summary' | 'subscriptions' | 'charge'
export type AnalysisResult = { result: string; source: 'on-device' | 'cloud'; redactions: string[] }

/** TODO: Replace this deterministic demo response with Firebase AI Logic. */
export async function analyze(text: string, task: AnalysisTask): Promise<AnalysisResult> {
  const { redactions } = redactPII(text)
  const source = text.length > 1200 ? 'cloud' : 'on-device'
  const examples: Record<AnalysisTask, string> = {
    summary: 'You spent ₹18,420 this month across 24 transactions. Food and dining is your largest category at ₹6,280. You are trending 8% below last month.',
    subscriptions: 'We spotted 3 recurring payments: Spotify (₹119/mo), Netflix (₹649/mo), and Google One (₹130/mo). Your total recurring spend is ₹898 per month.',
    charge: 'This looks like a recurring digital subscription. The merchant name may differ from the service name on your statement. Check the billing date against your subscription renewals.',
  }
  return { result: examples[task], source, redactions }
}
