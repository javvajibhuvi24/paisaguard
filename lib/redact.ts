export type RedactionResult = { text: string; redactions: string[] }

export function redactPII(input: string): RedactionResult {
  const redactions: string[] = []
  let text = input
  const patterns: Array<[RegExp, string, string]> = [
    [/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[EMAIL REDACTED]', 'email address'],
    [/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\b/gi, '[UPI ID REDACTED]', 'UPI ID'],
    [/(?<!\d)(?:\+?91[\s-]?)?[6-9]\d{9}(?!\d)/g, '[PHONE REDACTED]', 'phone number'],
    [/\b(?:\d[ -]*?){9,18}\b/g, '[ACCOUNT NUMBER REDACTED]', 'account number'],
  ]
  for (const [pattern, replacement, label] of patterns) {
    if (pattern.test(text)) {
      pattern.lastIndex = 0
      text = text.replace(pattern, () => {
        if (!redactions.includes(label)) redactions.push(label)
        return replacement
      })
    }
    pattern.lastIndex = 0
  }
  return { text, redactions }
}
