import Constants from './constants';

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

  /**
    * Check error class and return necessary 
    *
    * @params {error} some error
    * 
    * @return certain class
 **/
  static errorClass(error) {
    return (error.length === Constants.ZERO_LENGTH ? '' : 'has-error');
  }

  /**
    * Check is value valid
    *
    * @params {data} some data
    * 
    * @return result of validation
 **/
  static isValid(data) {
    return data ? '' : ' is invalid';
  }
}

export default Helper;