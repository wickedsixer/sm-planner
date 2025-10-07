export function formatDateISO(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toISOString().slice(0,10)
}
export function formatPretty(date) {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('sv-SE', { year:'numeric', month:'short', day:'numeric' })
}
