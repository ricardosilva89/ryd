module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/tests/**/*.test.ts?(x)'],
	collectCoverageFrom: ['<rootDir>/src/**'],
	modulePathIgnorePatterns: ['<rootDir>/dist/'],
	setupFilesAfterEnv: ['jest-extended/all'],
	verbose: true,
	testTimeout: 10000,
	coveragePathIgnorePatterns: ['<rootDir>/src/index.ts'],
	setupFilesAfterEnv: ['./tests/jest.setup.ts'],
};
