module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jestSetupEnv.ts'],
  testMatch: ['<rootDir>/tests/*spec.[jt]s'],
  rootDir: __dirname,
  moduleNameMapper: {
    '^@/(.*?)$': '<rootDir>/src/$1'
  }
}
