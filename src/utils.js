export const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n)

export const cleanUrl = (s) => s.replace(/([^:]\/)\/+/g, '$1')
