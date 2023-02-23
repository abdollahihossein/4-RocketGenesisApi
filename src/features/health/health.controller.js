
// hello
const helloWorld = async(req, res) => {
  res.send('Hello World!!')
}

// status
const status = async(req, res) => {
  res.send(`The Environment Name: ${process.env.ENV_NAME} - Port Number: ${process.env.PORT}`)
}

// error
const error = async(req, res) => {
  const error = new Error
  error.status = 404
  error.message = 'Not Found'
  res.status(error.status)
  res.send(`Something goes wrong! - Error code: ${error.status} - Error message: ${error.message}`)
}

module.exports = {helloWorld, status, error}