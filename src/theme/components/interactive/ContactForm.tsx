'use client'

import { useRef, useState } from 'react'
import { Form, PhoneField, SubmitButton, TextField, useStorefront } from '@dripfunnel/storefront-core/theme'
import { emptyDraft, fields, messageMax, problemOf, sendContactMessage, type ContactDraft, type ContactField, type ContactProblem, type SendResult } from '../contactForm'
import styles from '../../styles/contact.module.css'

/**
 * The four-field contact form: first name, last name, phone number and message, each required and checked. Problems
 * show after the first try and then as the shopper types. Send Message waits while sending; a message that was sent
 * clears the form, one that wasn't keeps every word, and while no endpoint takes messages the form says so plainly.
 */
export const ContactForm = () => {
  const { t, locale } = useStorefront()
  const [draft, setDraft] = useState<ContactDraft>(emptyDraft)
  const [tried, setTried] = useState(false)
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<SendResult | null>(null)
  const status = useRef<HTMLDivElement>(null)

  const problem = (field: ContactField) => (tried ? problemOf(field, draft) : null)
  const words: Record<ContactProblem, string> = {
    required: t('pages.contact.form.errors.required'),
    name: t('pages.contact.form.errors.name'),
    phone: t('pages.contact.form.errors.phone'),
    short: t('pages.contact.form.errors.short'),
    long: t('pages.contact.form.errors.long'),
  }
  const errorOf = (field: ContactField) => {
    const p = problem(field)
    return p ? words[p] : null
  }
  const set = (field: ContactField) => (value: string) => {
    setDraft((d) => ({ ...d, [field]: value }))
    setResult(null)
  }

  const submit = () => {
    setTried(true)
    if (sending || fields.some((f) => problemOf(f, draft) !== null)) return
    setSending(true)
    setResult(null)
    sendContactMessage().then(
      (sent) => {
        setResult(sent)
        if (sent === 'sent') {
          setDraft(emptyDraft)
          setTried(false)
        }
      },
      () => setResult('failed'),
    ).finally(() => {
      setSending(false)
      setTimeout(() => status.current?.focus(), 0)
    })
  }

  const invalid = tried && fields.some((f) => problemOf(f, draft) !== null)
  return (
    <Form onSubmit={submit} label={t('pages.contact.form.label')} className={styles.form}>
      <div className={styles.names}>
        <TextField label={t('pages.contact.form.firstName')} hint={t('pages.contact.form.firstNameHint')} autoComplete="given-name" maxLength={50} value={draft.firstName} onChange={set('firstName')} error={errorOf('firstName')} className={styles.field} />
        <TextField label={t('pages.contact.form.lastName')} hint={t('pages.contact.form.lastNameHint')} autoComplete="family-name" maxLength={50} value={draft.lastName} onChange={set('lastName')} error={errorOf('lastName')} className={styles.field} />
      </div>
      <PhoneField
        label={t('pages.contact.form.phone')}
        hint={t('pages.contact.form.phoneHint')}
        codeLabel={t('pages.contact.form.phoneCode')}
        country="IN"
        locale={locale}
        autoComplete="tel"
        value={draft.phone}
        onChange={set('phone')}
        error={errorOf('phone')}
        className={styles.field}
        groupClassName={styles.phoneGroup}
      />
      <TextField label={t('pages.contact.form.message')} hint={t('pages.contact.form.messageHint')} maxLength={messageMax} value={draft.message} onChange={set('message')} error={errorOf('message')} className={`${styles.field} ${styles.messageField}`} />
      <p className={styles.required}>{t('pages.contact.form.requiredNote')}</p>
      {invalid ? (
        <p className={styles.formError} role="alert">
          {t('pages.contact.form.fix')}
        </p>
      ) : null}
      <SubmitButton disabled={sending} className={styles.submit}>
        {sending ? t('pages.contact.form.sending') : t('pages.contact.form.send')}
      </SubmitButton>
      <div ref={status} tabIndex={-1} className={styles.statusWrap} role="status" aria-live="polite">
        {result === 'sent' ? <p className={`${styles.status} ${styles.statusOk}`}>{t('pages.contact.form.sent')}</p> : null}
        {result === 'failed' ? <p className={`${styles.status} ${styles.statusBad}`}>{t('pages.contact.form.failed')}</p> : null}
        {result === 'unavailable' ? (
          <div className={`${styles.status} ${styles.statusInfo}`}>
            <p className={styles.statusTitle}>{t('pages.contact.form.unavailableTitle')}</p>
            <p>{t('pages.contact.form.unavailable')}</p>
          </div>
        ) : null}
      </div>
    </Form>
  )
}
