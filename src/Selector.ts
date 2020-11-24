interface HtmlElementTagName {
  div: HTMLDivElement;
}

type HtmlElementTag = keyof HtmlElementTagName;

interface Select {
  tagname?: HtmlElementTag;
  id: string;
  cssClasses: string[];
}

interface SelectorOptions {
  not: boolean;
}

abstract class Selector {
  protected select: Select = {
    tagname: undefined,
    id: "",
    cssClasses: new Array<string>(),
  };

  get selector(): string {
    const { tagname, id, cssClasses } = this.select;
    const idSelect = id ? "#" + id : "";
    const cssClassSelect =
      cssClasses.length > 0 ? "." + cssClasses.join(".") : "";

    let selector = `${tagname ?? ""}${idSelect}${cssClassSelect}`;

    if (this.options.not) {
      selector = `:not(${selector})`;
    }

    return selector;
  }

  constructor(protected options: SelectorOptions) {}
}

class TagSelector extends Selector {
  constructor(tag: HtmlElementTag, options: SelectorOptions) {
    super(options);
    this.select.tagname = tag;
  }

  get and(): TagAndConstraint {
    return new TagAndConstraint(this.select.tagname);
  }
}

class TagAndConstraint {
  constructor(private tagname: HtmlElementTag) {}

  get not(): TagAndConstraint {
    return new TagAndConstraint(this.tagname);
  }

  withId(id: string): IdSelector {
    return new IdSelector(id, undefined, this.tagname);
  }

  withCssClass(cssClass: string): CssClassSelector {
    return new CssClassSelector(cssClass, undefined, this.tagname);
  }
}

class IdSelector extends Selector {
  constructor(
    id: string,
    options: SelectorOptions = {
      not: false,
    },
    tagname: HtmlElementTag = undefined
  ) {
    super(options);
    this.select.tagname = tagname;
    this.select.id = id;
  }

  get and(): IdAndConstraint {
    const { tagname, id } = this.select;
    return new IdAndConstraint(id, tagname);
  }
}

class IdAndConstraint {
  constructor(
    private id: string,
    private tagname: HtmlElementTag = undefined
  ) {}

  withCssClass(cssClass: string): CssClassSelector {
    return new CssClassSelector(cssClass, undefined, this.tagname, this.id);
  }
}

class CssClassSelector extends Selector {
  constructor(
    cssClassName: string,
    options: SelectorOptions = {
      not: false,
    },
    tagname: HtmlElementTag = undefined,
    id: string = ""
  ) {
    super(options);
    this.select.tagname = tagname;
    this.select.id = id;
    this.select.cssClasses = [...this.select.cssClasses, cssClassName];
  }

  get and(): CssClassAndConstraint {
    const { tagname, id, cssClasses } = this.select;
    return new CssClassAndConstraint(cssClasses, this.options, tagname, id);
  }
}

class CssClassAndConstraint {
  constructor(
    private cssClasses: string[],
    private options: SelectorOptions,
    private tagname: HtmlElementTag = undefined,
    private id: string
  ) {}

  get not(): CssClassAndConstraint {
    return new CssClassAndConstraint(
      this.cssClasses,
      {
        not: true,
      },
      this.tagname,
      this.id
    );
  }

  withCssClass(cssClass: string): CssClassSelector {
    return new CssClassSelector(
      [...this.cssClasses, cssClass].join("."),
      this.options,
      this.tagname,
      this.id
    );
  }
}

class AllSelector extends Selector {
  get not(): AllSelector {
    return new AllSelector({
      not: true,
    });
  }

  constructor(options: SelectorOptions) {
    super(options);
  }

  withTagname(tag: HtmlElementTag): TagSelector {
    return new TagSelector(tag, this.options);
  }

  withId(id: string): IdSelector {
    return new IdSelector(id, this.options);
  }

  withCssClass(cssClassName: string): CssClassSelector {
    return new CssClassSelector(cssClassName, this.options);
  }
}

const createSeletor = function (): AllSelector {
  return new AllSelector({
    not: false,
  });
};

export default createSeletor;
