interface HtmlElementTagName {
  div: HTMLDivElement;
}

interface Select {
  tagname: string;
}

class Selector {
  private selectors: Array<Select> = [
    {
      tagname: '',
    },
  ];

  get selector(): string {
    const selectors = this.selectors.map((selector) => {
      const { tagname } = selector;
      return `${tagname}`;
    });
    return selectors.join(',');
  }

  withTagname(tag: keyof HtmlElementTagName): Selector {
    this.selectors = this.selectors.map(
      (selector, index): Select => {
        if (index + 1 !== this.selectors.length) {
          return selector;
        } else {
          return {
            ...selector,
            tagname: tag,
          };
        }
      }
    );
    return this;
  }
}

const createSeletor = function (): Selector {
  return new Selector();
};

export default createSeletor;
