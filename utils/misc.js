module.exports.sendResponse = (
  response,
  data,
  message = '',
  success = true,
  statusCode = 200,
  error = null
) => {
  var info = {}

  Object.assign(
    info,
    (success || !success) && { success },
    data && { data },
    message && { message },
    error && { error }
  )

  return response.status(statusCode).json(info)
}
