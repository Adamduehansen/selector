/**
 *
 * API
 * createSelector().withTagname('div').selector           => div
 * createSelector().withId('any-id).selector              => #any-id
 * createSelector().withCssClass('any-class').selector    => .any-class
 * createSelector()
 *  .withTagname('div')
 *  .and()
 *  .withId('any-id')
 *  .selector                                             => div#any-id
 *
 */

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
  });

  describe('withId', () => {
    test('should set id in selector', () => {
      // Arrange
      const expectedSelector = '#any-id';

      // Act
      const actualSelector = createSeletor().withId('any-id').selector;

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
