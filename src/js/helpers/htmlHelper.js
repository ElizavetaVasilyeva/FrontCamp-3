class HtmlHelper {

  /**
   * Cut off string by {n} chars
   *
   * @params {string} some string
   * @params {n} amount of chars
   * 
   * @return cutting string
  **/
  static cutString(string, n) {
    return (string && n) ? string.split(' ').slice(0, n).join(' ') + '...' : '';
  }

  /**
   * Clear innerHtml property of certain container 
   *
   * @params {container} some container
   * 
   * @return container with empty innerHtml property
  **/
  static clearContainer(containers) {
    if (!(containers instanceof Array)) {
      containers = [containers];
    }

    for (var i = 0; i < containers.length; i++) {
      containers[i] ? containers[i].innerHTML = '' : null;
    }
  }

  /**
   * Return first n-count elements from certain sequence
   *
   * @params {source} some sequence 
   * @params {n} amount of elements
   * 
   * @return first n-count elements from certain sequence
  **/
  static getFirstNElements(source, n) {
    return (source && n) ? source.slice(0, n) : null;
  }

  /**
   * Clear value property of element
   *
   * @params {element} certain element
   * 
   * @return element with with empty value
  **/
  static clearValue(elements) {
    if (!(elements instanceof Array)) {
      elements = [elements];
    }

    for (var i = 0; i < elements.length; i++) {
      elements[i] ? elements[i].value = "" : null;
    }

  }

  //Composite pattern

  /**
  * Hide div elements
  *
  * @params {elements} certain elements
 **/
  static hideDiv(elements) {
    if (!(elements instanceof Array)) {
      elements = [elements];
    }

    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
    }
  }

  /**
   * Show div element
   *
   * @params {element} certain element
  **/
  static showDiv(elements) {
    if (!(elements instanceof Array)) {
      elements = [elements];
    }

    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = 'block';
    }
  }
}

export default HtmlHelper