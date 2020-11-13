interface HtmlElementTagName {
  div: HTMLDivElement;
}

type HtmlElementTag = keyof HtmlElementTagName;

interface Select {
  tagname?: HtmlElementTag;
  id: string;
  cssClasses: string[];
}

abstract class Selector {
  protected select: Select = {
    tagname: undefined,
    id: '',
    cssClasses: new Array<string>(),
  };

  get selector(): string {
    const { tagname, id, cssClasses } = this.select;
    return `${tagname ?? ''}${id ? '#' + id : ''}${
      cssClasses.length > 0 ? '.' + cssClasses.join('.') : ''
    }`;
  }
}

class TagSelector extends Selector {
  constructor(tag: HtmlElementTag) {
    super();
    this.select.tagname = tag;
  }

  get and(): TagAndConstraint {
    return new TagAndConstraint(this.select.tagname);
  }
}

class TagAndConstraint {
  constructor(private tagname: HtmlElementTag) {}

  withId(id: string): IdSelector {
    return new IdSelector(id, this.tagname);
  }

  withCssClass(cssClass: string): CssClassSelector {
    return new CssClassSelector(cssClass, this.tagname);
  }
}

class IdSelector extends Selector {
  constructor(id: string, tagname: HtmlElementTag = undefined) {
    super();
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
    super();
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
  withTagname(tag: HtmlElementTag): TagSelector {
    return new TagSelector(tag);
  }

  withId(id: string): IdSelector {
    return new IdSelector(id);
  }

  withCssClass(cssClassName: string): CssClassSelector {
    return new CssClassSelector(cssClassName);
  }
}

const createSeletor = function (): AllSelector {
  return new AllSelector();
};

export default createSeletor;
