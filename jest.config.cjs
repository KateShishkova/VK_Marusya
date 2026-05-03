module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-fixed-jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "mjs"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironmentOptions: {
    customExportConditions: ["node", ""],
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/mocks/fileMock.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/mocks/fileMock.js",
    "^(\\.{1,2}/.*)\\.m?js$": "$1",

    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@app-types/(.*)$": "<rootDir>/src/app-types/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@schemas/(.*)$": "<rootDir>/src/schemas/$1",
  },
  transform: {
    "^.+\\.(t|j|m)sx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json",
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(msw|rettime|@mswjs)/)"],
};
