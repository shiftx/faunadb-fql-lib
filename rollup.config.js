import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import typescript from "rollup-plugin-typescript"
import peerDepsExternal from "rollup-plugin-peer-deps-external"

import pkg from "./package.json"

export default [
    {
        input: "src/index.ts",
        output: {
            name: "faunaFqlLib",
            file: pkg.browser,
            format: "umd",
            globals: {
                faunadb: "faunadb",
            },
        },
        plugins: [peerDepsExternal(), resolve(), commonjs(), typescript()],
    },
    {
        input: "src/index.ts",
        external: ["ms"],
        plugins: [peerDepsExternal(), typescript()],
        output: [
            { file: pkg.main, format: "cjs" },
            { file: pkg.module, format: "es" },
        ],
    },
]
