class Selector {
  get selector(): string {
    return '';
  }
}

const createSeletor = function (): Selector {
  return new Selector();
};

export default createSeletor;
