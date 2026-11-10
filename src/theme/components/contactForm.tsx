/**
 * The contact form's rules and its one connection point. The Shop API takes no contact message yet (core: "the Shop API
 * takes no message yet, so a theme leaves it out or points to the store's email"), so `sendContactMessage` reports
 * 'unavailable' and the page says so plainly, keeping what the shopper typed; it never pretends a message was sent.
 * When DripFunnel adds a contact endpoint, send the message there and return 'sent' or 'failed'.
 */
export type ContactDraft = { firstName: string; lastName: string; phone: string; message: string }

export type ContactField = keyof ContactDraft

export const emptyDraft: ContactDraft = { firstName: '', lastName: '', phone: '', message: '' }

export type ContactProblem = 'required' | 'name' | 'phone' | 'short' | 'long'

/** A name: at least one letter, in any script; letters, spaces, apostrophes, dots and hyphens, up to 50. */
const namePattern = /^(?=.*\p{L})[\p{L}\p{M} .'-]{1,50}$/u

/** A phone number as core's phone field hands it back: a plus, the country code and the number, 7 to 15 digits in all. */
const phonePattern = /^\+\d{7,15}$/

export const messageMin = 10
export const messageMax = 1000

/** What's wrong with one field, or null. */
export const problemOf = (field: ContactField, draft: ContactDraft): ContactProblem | null => {
  const value = draft[field].trim()
  if (value === '') return 'required'
  if (field === 'firstName' || field === 'lastName') return namePattern.test(value) ? null : 'name'
  if (field === 'phone') return phonePattern.test(value.replace(/[\s-]/g, '')) ? null : 'phone'
  if (value.length < messageMin) return 'short'
  return value.length > messageMax ? 'long' : null
}

export const fields: readonly ContactField[] = ['firstName', 'lastName', 'phone', 'message']

export type SendResult = 'sent' | 'failed' | 'unavailable'

/** Whether a contact endpoint exists. Until it does, Send Message never sends and the page says so. */
export const contactConnected = false

/** Sends one message, once an endpoint exists; until then nothing is sent. */
export const sendContactMessage = async (): Promise<SendResult> => (contactConnected ? 'failed' : 'unavailable')
