module.exports = function (request, response, next) {
    var passcode = 'super-secret';
    console.log(request.headers["Authorization"])
    if (request.query.passcode === passcode) {
      next();
    } else {
      response.send(401);
    }
  }
  