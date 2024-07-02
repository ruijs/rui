import tscAlias from "rollup-plugin-tsc-alias";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

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
  plugins: [typescript(), tscAlias(), postcss({ extract: true })],
  external: ["@ruiapp/move-style", "@ruiapp/react-renderer", "events", "antd", "lodash", "react", "react/jsx-runtime"],
};
