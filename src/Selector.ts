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
    id: '',
    cssClasses: new Array<string>(),
  };

  get selector(): string {
    const { tagname, id, cssClasses } = this.select;
    const idSelect = id ? '#' + id : '';
    const cssClassSelect =
      cssClasses.length > 0 ? '.' + cssClasses.join('.') : '';

    let selector = `${tagname ?? ''}${idSelect}${cssClassSelect}`;

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

  withId(id: string): IdSelector {
    return new IdSelector(id, undefined, this.tagname);
  }

  withCssClass(cssClass: string): CssClassSelector {
    return new CssClassSelector(cssClass, this.tagname);
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
    return new CssClassSelector(cssClass, this.tagname, this.id);
  }
}

class CssClassSelector extends Selector {
  constructor(
    cssClassName: string,
    tagname: HtmlElementTag = undefined,
    id: string = ''
  ) {
    super({
      not: false,
    });
    this.select.tagname = tagname;
    this.select.id = id;
    this.select.cssClasses = [...this.select.cssClasses, cssClassName];
  }

  get and(): CssClassAndConstraint {
    const { tagname, id, cssClasses } = this.select;
    return new CssClassAndConstraint(cssClasses, tagname, id);
  }
}

class CssClassAndConstraint {
  constructor(
    private cssClasses: string[],
    private tagname: HtmlElementTag = undefined,
    private id: string
  ) {}

  withCssClass(cssClass: string): CssClassSelector {
    return new CssClassSelector(
      [...this.cssClasses, cssClass].join('.'),
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
    return new CssClassSelector(cssClassName);
  }
}

const createSeletor = function (): AllSelector {
  return new AllSelector({
    not: false,
  });
};

export default createSeletor;
