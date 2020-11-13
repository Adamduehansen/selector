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
  });
});
