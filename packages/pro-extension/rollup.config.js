import tscAlias from "rollup-plugin-tsc-alias";
import typescript from "rollup-plugin-typescript2";
import css from "rollup-plugin-css-only";
import postcss from "rollup-plugin-postcss";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: ["src/mod.ts"],
  output: [
    {
      dir: "dist",
      entryFileNames: "[name].js",
      format: "cjs",
      exports: "named",
    },
  ],
  plugins: [nodeResolve(), commonjs(), typescript(), tscAlias(), postcss({ extract: true })],
  external: ["@ruiapp/move-style", "@ruiapp/react-renderer", "antd", "react", "react/jsx-runtime", "lodash"],
};
