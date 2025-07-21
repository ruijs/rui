import typescript from "rollup-plugin-typescript2";
import tscAlias from "rollup-plugin-tsc-alias";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

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
  plugins: [
    typescript(),
    tscAlias(),
    commonjs(),
    nodeResolve({
      preferBuiltins: false,
    }),
  ],

  external: ["axios", "lodash", "qs"],
};
