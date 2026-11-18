'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type PrivacyPreferences = {
  preferOnDevice: boolean
  allowCloudFallback: boolean
  maxOnDeviceInputLength: number
}

type PreferencesContextValue = {
  preferences: PrivacyPreferences
  updatePreferences: (updates: Partial<PrivacyPreferences>) => void
}

const defaultPreferences: PrivacyPreferences = {
  preferOnDevice: true,
  allowCloudFallback: true,
  maxOnDeviceInputLength: 1200,
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

export function PrivacyPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(defaultPreferences)

  function updatePreferences(updates: Partial<PrivacyPreferences>) {
    setPreferences((current) => ({ ...current, ...updates }))
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePrivacyPreferences() {
  const context = useContext(PreferencesContext)
  if (!context) throw new Error('usePrivacyPreferences must be used inside PrivacyPreferencesProvider')
  return context
}
