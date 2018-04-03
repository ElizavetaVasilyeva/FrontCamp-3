const jsonwebtoken = require('jsonwebtoken');
const config = require('../../config/config');

class Helper {

  /**
   * Prepare error, add additional info
   *
   * @params {err} some error
   * @params {status} http status
   * @params {message} additional status
   * 
   * @return prepared error
  **/
  static prepareError(err, status, message) {
    err.status = status;
    err.message = `${message}\n${err.message}`;
    return err;
  }

  /**
   * Create token for user
   *
   * @params {user} some user
   * 
   * @return created token
  **/
  static createToken(user) {
    var token = jsonwebtoken.sign({
      id: user._id,
      name: user.name,
      username: user.username
    }, config.secretKey, {
        expiresIn: 1440
      });
    return token;
  }
}

module.exports = Helper;