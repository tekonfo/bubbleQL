export function getFetch() {
  if (typeof window === 'undefined') {
    const createFetch = require('@vercel/fetch')
    return createFetch()
  }
  return window.fetch
}
