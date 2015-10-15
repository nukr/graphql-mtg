export function log (msg, ...args) {
  console.log(`\n********** Start ${msg} **********\n`)
  console.log(...args)
  console.log(`\n********** End ${msg} **********\n`)
}
