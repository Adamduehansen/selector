interface HtmlElementTagName {
  div: HTMLDivElement;
}

interface Select {
  tagname: string;
  id: string;
  cssClasses: string[];
}

abstract class Selector {
  protected select: Select = {
    tagname: '',
    id: '',
    cssClasses: new Array<string>(),
  };

  get selector(): string {
    const { tagname, id, cssClasses } = this.select;
    return `${tagname}${id ? '#' + id : ''}${
      cssClasses.length > 0 ? '.' + cssClasses.join('.') : ''
    }`;
  }
}

class TagSelector extends Selector {
  constructor(tag: keyof HtmlElementTagName) {
    super();
    this.select.tagname = tag;
  }

  get and(): TagAndConstrain {
    return new TagAndConstrain(this.select.tagname);
  }
}

class TagAndConstrain {
  constructor(private tagname: string) {}

  withId(id: string): IdSelector {
    return new IdSelector(id, this.tagname);
  }

  withCssClass(cssClass: string): CssClassSelector {
    return new CssClassSelector(cssClass, this.tagname);
  }
}

class IdSelector extends Selector {
  constructor(id: string, tagname = '') {
    super();
    this.select.tagname = tagname;
    this.select.id = id;
  }
}

class CssClassSelector extends Selector {
  constructor(cssClassName: string, tagname = '') {
    super();
    this.select.tagname = tagname;
    this.select.cssClasses = [...this.select.cssClasses, cssClassName];
  }
}

class AllSelector extends Selector {
  withTagname(tag: keyof HtmlElementTagName): TagSelector {
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
