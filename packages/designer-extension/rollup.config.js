import tscAlias from "rollup-plugin-tsc-alias";
import typescript from "rollup-plugin-typescript2";

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
  plugins: [typescript(), tscAlias()],
  external: ["@ruiapp/move-style", "@ruiapp/react-renderer", "events", "lodash", "react", "react/jsx-runtime"],
};
