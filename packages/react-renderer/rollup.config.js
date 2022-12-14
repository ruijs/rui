import typescript from 'rollup-plugin-typescript2';

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
    ],
    external: [
        "@ruijs/move-style",
        "lodash",
        "react",
        "react/jsx-runtime"
    ]
};
