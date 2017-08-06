module.exports = {
  roots: ['<rootDir>'],
  rootDir: 'src',
  transform: {
    // need to load js files also because import createStore
    "\\.((j|t)s|tsx)$": "<rootDir>/../node_modules/ts-jest/preprocessor.js"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json"
  ]
}