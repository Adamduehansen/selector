interface HTMLElementTagName {
  div: HTMLDivElement;
  a: HTMLAnchorElement;
}

interface Select {
  tagname: string;
  id: string;
  classes: string[];
}

class Selector {
  private selectors: Array<Select> = [
    {
      tagname: "",
      id: "",
      classes: new Array<string>(),
    },
  ];

  get selector(): string {
    return this.selectors
      .map((selector) => {
        const { tagname, id, classes } = selector;
        return `${tagname}${id ? "#" + id : ""}${
          classes.length > 0 ? "." + classes.join(".") : ""
        }`;
      })
      .join(",");
  }

  withTagname(tagname: keyof HTMLElementTagName): Selector {
    this.selectors = this.selectors.map(
      (selector, index): Select => {
        if (index + 1 !== this.selectors.length) {
          return selector;
        }
        return {
          ...selector,
          tagname,
        };
      }
    );
    return this;
  }
}

const createSeletor = function (): Selector {
  return new Selector();
};

export default createSeletor;
