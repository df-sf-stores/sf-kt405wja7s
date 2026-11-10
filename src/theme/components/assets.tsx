/**
 * A Storefront › Assets id written in content/{language}/*.json, as core's <MerchantImage> takes it; null while the words
 * still say "pending", so a page can show its own placeholder until the picture is uploaded.
 */
export const uploaded = (id: string) => {
  const trimmed = id.trim()
  return trimmed !== 'pending' && /^[A-Za-z0-9_-]{1,128}$/.test(trimmed) ? trimmed : null
}
