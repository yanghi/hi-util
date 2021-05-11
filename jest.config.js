module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/tests/*spec.[jt]s'],
  rootDir: __dirname,
  moduleNameMapper: {
    '^@/(.*?)$': '<rootDir>/src/$1'
  }
}
