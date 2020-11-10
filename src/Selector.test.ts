import createSeletor from "./selector";

describe("createSelector", () => {
  test("should have empty selector", () => {
    // Arrange
    const expectedSelector = "";

    // Act
    const actualSelector = createSeletor().selector;

    // Assert
    expect(actualSelector).toEqual(expectedSelector);
  });
});
