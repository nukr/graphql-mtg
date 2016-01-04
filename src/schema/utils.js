export function attachFields (refs, fields) {
  return Object.keys(fields)
    .reduce((acc, key) => {
      acc[key] = fields[key](refs)
      return acc
    }, {})
}
