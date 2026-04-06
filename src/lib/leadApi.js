const LEAD_PATH = '/.netlify/functions/lead'

export async function submitLead(payload) {
  const res = await fetch(LEAD_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  let data
  try {
    data = await res.json()
  } catch {
    throw new Error('Something went wrong. Please try again.')
  }

  if (!res.ok) {
    const msg = data?.error || 'Request failed'
    const err = new Error(msg)
    err.status = res.status
    err.errors = data?.errors
    throw err
  }

  return data
}
