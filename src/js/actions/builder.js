class Builder {
  constructor(service, generator) {
    this.service = service;
    this.generator = generator;
  }

  async Build() {
    const data = await this.service();
    this.generator.Run(data);
  }
}

export default Builder