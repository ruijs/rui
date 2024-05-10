import tscAlias from "rollup-plugin-tsc-alias";
import typescript from "rollup-plugin-typescript2";
import css from "rollup-plugin-import-css";

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
    css({
      output: "main.css",
      minify: true,
    }),
    typescript(),
    tscAlias(),
  ],
  external: ["@ruiapp/move-style", "@ruiapp/react-renderer", "react", "react/jsx-runtime", "lodash"],
};
