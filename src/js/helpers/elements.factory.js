/**
 * This abstract class for concrete creator
 *
 * */
class Creator {
  constructor(document) {
    this.document = document;
  }

  FactoryMethod() { }
}

class Element {
  constructor(document) {
    this.document = document;
  }

  GetElement() { }
}

class ContainerElement extends Element {
  constructor(document) {
    super(document);
  }

  GetElement() {
    return this.document.getElementById('sources');
  }
}

class MainContainerElement extends Element {
  constructor(document) {
    super(document);
  }

  GetElement() {
    return this.document.getElementById('container');
  }
}

class InfoContainerElement extends Element {
  constructor(document) {
    super(document);
  }

  GetElement() {
    return this.document.getElementById('infoContainer');
  }
}

class SearchIdElement extends Element {
  constructor(document) {
    super(document);
  }

  GetElement() {
    return this.document.getElementById('searchId');
  }
}

export class ContainerCreator extends Creator {
  constructor(document) {
    super(document);
  }

  FactoryMethod() {
    return new ContainerElement(document);
  }
}

export class MainContainerCreator extends Creator {
  constructor(document) {
    super(document);
  }

  FactoryMethod() {
    return new MainContainerElement(document);
  }
}

export class InfoContainerCreator extends Creator {
  constructor(document) {
    super(document);
  }

  FactoryMethod() {
    return new InfoContainerElement(document);
  }
}

export class SearchIdCreator extends Creator {
  constructor(document) {
    super(document);
  }

  FactoryMethod() {
    return new SearchIdElement(document);
  }
}