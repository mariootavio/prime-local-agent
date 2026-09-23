/**
 * Builds Google Maps' no-API-key embed URL from the client's real
 * enderecoCompleto (prime-local.json). Google resolves the address
 * query to the matching Google Business Profile listing when one
 * exists, so the embed shows the business's own pin/card without any
 * key or manually pasted embed code.
 */
export function buildGoogleMapsEmbedUrl(enderecoCompleto: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(enderecoCompleto)}&output=embed`;
}
