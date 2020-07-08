export const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n)

export const cleanUrl = (s) => s.replace(/(?<=[^:\s])(\/{2,})/g, '/')
