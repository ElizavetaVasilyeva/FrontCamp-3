class SourceItemFactory {
  constructor(source) {
    this.source = source;
  }

  generateSourceItem() {
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

export default SourceItemFactory