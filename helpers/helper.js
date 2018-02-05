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
}

module.exports = Helper;