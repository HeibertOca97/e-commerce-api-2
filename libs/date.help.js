// HOURS = 1 TO 24
const getHours = (hours = 1) => {
  return (Date.now() / 1000 + (60 * 60 * hours))
}
// MINUTES = 1 TO 59
const getMinutes = (minutes = 1) => {
  return (Date.now() / 1000 + (60 * minutes))
}

// SECONDS = 1 TO 59
const getSeconds = (seconds = 1) => {
  return (Date.now() / 1000 + (seconds))
}


module.exports = {
  getHours,
  getMinutes,
  getSeconds
}
