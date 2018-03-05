class Helper {

  /**
     * Prepare date in local format
     *
     * @params {date} some date
     * 
     * @return prepared date
  **/
  static GetLocalDateString(date) {
    return new Date(date).toLocaleDateString('en-US');
  }
}

module.exports = Helper;