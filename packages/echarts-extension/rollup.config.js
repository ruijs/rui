import tscAlias from 'rollup-plugin-tsc-alias';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: ["src/mod.ts"],
    output: [
        {
            dir: "dist",
            entryFileNames: "[name].js",
            format: "cjs",
            exports: "named"
        }
    ],
    plugins: [
        typescript(),
        tscAlias(),
        commonjs(),
        nodeResolve(),
    ],
    external: [
        "@ruiapp/move-style",
        "@ruiapp/react-renderer",
        "react",
        "react/jsx-runtime",
    ]
};
