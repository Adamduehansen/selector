interface HtmlElementTagName {
  div: HTMLDivElement;
}

interface Select {
  tagname: string;
  id: string;
}

class Selector {
  private selectors: Array<Select> = [
    {
      tagname: '',
      id: '',
    },
  ];

  get selector(): string {
    const selectors = this.selectors.map((selector) => {
      const { tagname, id } = selector;
      return `${tagname}${id ? '#' + id : ''}`;
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

  withId(id: string): Selector {
    this.selectors = this.selectors.map(
      (selector, index): Select => {
        if (index + 1 !== this.selectors.length) {
          return selector;
        } else {
          return {
            ...selector,
            id: id,
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
