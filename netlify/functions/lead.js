import fs from 'fs/promises'
import path from 'path'

const LEADS_FILE = path.join('/tmp', 'leads.ndjson')

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function validate(body) {
  if (String(body.company || '').trim()) {
    return { bot: true, errors: {}, name: '', email: '', phone: '', message: '' }
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim().toLowerCase()
  const phone = String(body.phone || '').trim()
  const message = String(body.message || '').trim()

  const errors = {}
  if (name.length < 2) errors.name = 'Please enter your name (at least 2 characters).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.'
  if (phone && !/^[\d\s\-+().]{7,}$/.test(phone)) errors.phone = 'Please enter a valid phone number.'
  if (message.length < 10) errors.message = 'Tell us a bit more about your project (at least 10 characters).'

  return { bot: false, errors, name, email, phone, message }
}

async function sendLeadEmail(record) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — lead saved to /tmp only (ephemeral on Netlify)')
    return { ok: true, skipped: true }
  }

  const to = process.env.LEAD_NOTIFY_EMAIL || 'rawatamit865@gmail.com'
  const from = process.env.RESEND_FROM_EMAIL || 'AScustom web <onboarding@resend.dev>'

  const html = `
    <h2>New lead — AScustom web</h2>
    <p><strong>Name:</strong> ${escapeHtml(record.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(record.email)}">${escapeHtml(record.email)}</a></p>
    <p><strong>Phone:</strong> ${record.phone ? escapeHtml(record.phone) : '—'}</p>
    <p><strong>Source:</strong> ${escapeHtml(record.source)}</p>
    <p><strong>Time:</strong> ${escapeHtml(record.createdAt)}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(record.message)}</pre>
  `.trim()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: record.email,
      subject: `New lead: ${record.name} — AScustom web`,
      html,
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('Resend error', res.status, errText)
    return { ok: false, error: errText }
  }

  return { ok: true, skipped: false }
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  let parsed
  try {
    parsed = JSON.parse(event.body || '{}')
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    }
  }

  const { bot, errors, name, email, phone, message } = validate(parsed)

  if (bot) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, message: 'Thank you — we will get back to you within one business day.' }),
    }
  }

  if (Object.keys(errors).length) {
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify({ error: 'Validation failed', errors }),
    }
  }

  const record = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    name,
    email,
    phone: phone || null,
    message,
    source: String(parsed.source || 'website').slice(0, 120),
    createdAt: new Date().toISOString(),
  }

  try {
    await fs.appendFile(LEADS_FILE, `${JSON.stringify(record)}\n`, 'utf8')
  } catch (err) {
    console.error('lead storage error', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Could not save your request. Please try again.' }),
    }
  }

  const emailResult = await sendLeadEmail(record)

  if (process.env.RESEND_API_KEY && !emailResult.ok) {
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({
        error: 'We saved your message but could not send the alert email. Please email rawatamit865@gmail.com directly.',
      }),
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      ok: true,
      message: 'Thank you — we will get back to you within one business day.',
    }),
  }
}
