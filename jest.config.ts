// /jest.config.ts
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: "v8",
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default createJestConfig(config);