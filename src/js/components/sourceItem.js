class Factory {
  constructor() {
  }

  createSourceItem(sourceItem) {
  }
}

class SourceFactory extends Factory {
  constructor() {
    super()
  }

  createSourceItem(sourceItem) {
    return new SourceItem(sourceItem)
  }
}

class BaseSourceItem {
  constructor(source) {
    this.source = source;
  }

  generate() {
  }
}

class SourceItem extends BaseSourceItem {
  constructor(source) {
    super(source)
  }

  generate() {
    const { id, name, url } = this.source;
    this.item = document.createElement('div');
    this.item.classList.add('albumItem', 'label', 'success');
    this.item.setAttribute('source-id', id);

    const span = document.createElement('span');
    const url2 = document.createElement('a');

    span.innerHTML = name;
    this.item.appendChild(span);

    return this.item;
  }
}

export default SourceFactory