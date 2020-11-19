import createSeletor from './selector';

describe('createSelector', () => {
  test('should have empty selector', () => {
    // Arrange
    const expectedSelector = '';

    // Act
    const actualSelector = createSeletor().selector;

    // Assert
    expect(actualSelector).toEqual(expectedSelector);
  });

  test('should create selector not with tag', () => {
    // Arrange
    const expectedSelector = ':not(div)';

    // Act
    const actualSelector = createSeletor().not.withTagname('div').selector;

    // Assert
    expect(actualSelector).toEqual(expectedSelector);
  });

  test('should create selector not with id', () => {
    // Arrange
    const expectedSelector = ':not(#any-id)';

    // Act
    const actualSelector = createSeletor().not.withId('any-id').selector;

    // Assert
    expect(actualSelector).toEqual(expectedSelector);
  });

  describe('withTagname', () => {
    test('should set tagname in selector', () => {
      // Arrange
      const expectedSelector = 'div';

      // Act
      const actualSelector = createSeletor().withTagname('div').selector;

      // Assert
      expect(actualSelector).toEqual(expectedSelector);
    });

    test('should add tagname and id in selector', () => {
      // Arrange
      const expectedSelector = 'div#any-id';

      // Act
      const actualSelector = createSeletor()
        .withTagname('div')
        .and.withId('any-id').selector;

      // Assert
      expect(actualSelector).toEqual(expectedSelector);
    });

    test('should add tagname and css class in selector', () => {
      // Arrange
      const expectedSelector = 'div.any-class';

      // Act
      const actualSelector = createSeletor()
        .withTagname('div')
        .and.withCssClass('any-class').selector;

      // Assert
      expect(actualSelector).toEqual(expectedSelector);
    });

    test('should add tagname, id and css class in selector', () => {
      // Arrange
      const expectedSelector = 'div#any-id.any-class';

      // Act
      const actualSelector = createSeletor()
        .withTagname('div')
        .and.withId('any-id')
        .and.withCssClass('any-class').selector;

      // Assert
      expect(actualSelector).toEqual(expectedSelector);
    });
  });

  describe('withId', () => {
    test('should add id in selector', () => {
      // Arrange
      const expectedSelector = '#any-id';

      // Act
      const actualSelector = createSeletor().withId('any-id').selector;

      // Assert
      expect(actualSelector).toEqual(expectedSelector);
    });

    test('should add id and class in selector', () => {
      // Arrange
      const expectedSelector = '#any-id.any-class';

      // Act
      const actualSelector = createSeletor()
        .withId('any-id')
        .and.withCssClass('any-class').selector;

      // Assert
      expect(actualSelector).toEqual(expectedSelector);
    });
  });

  describe('withCssClass', () => {
    test('should add classes to selector', () => {
      // Arrange
      const expectedSelector = '.any-class';

      // Act
      const actualSelector = createSeletor().withCssClass('any-class').selector;

      // Assert
      expect(actualSelector).toEqual(expectedSelector);
    });

    test('should add additional classes to one selector with css class', () => {
      // Arrange
      const expectedSelector = '.any-css-class1.any-css-class2';

      // Act
      const actualSelector = createSeletor()
        .withCssClass('any-css-class1')
        .and.withCssClass('any-css-class2').selector;

      // Assert
      expect(actualSelector).toEqual(expectedSelector);
    });
  });
});
