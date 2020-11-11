interface HtmlElementTagName {
  div: HTMLDivElement;
}

interface Select {
  tagname: string;
  id: string;
  cssClasses: string[];
}

class Selector {
  private selectors: Array<Select> = [
    {
      tagname: '',
      id: '',
      cssClasses: new Array<string>(),
    },
  ];

  get selector(): string {
    const selectors = this.selectors.map((selector) => {
      const { tagname, id, cssClasses } = selector;
      return `${tagname}${id ? '#' + id : ''}${
        cssClasses.length > 0 ? '.' + cssClasses.join('.') : ''
      }`;
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

  withCssClass(cssClassName: string): Selector {
    this.selectors = this.selectors.map(
      (selector, index): Select => {
        if (index + 1 !== this.selectors.length) {
          return selector;
        } else {
          return {
            ...selector,
            cssClasses: [...selector.cssClasses, cssClassName],
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
