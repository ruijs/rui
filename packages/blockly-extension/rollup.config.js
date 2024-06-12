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
  external: ["@ruiapp/move-style", "@ruiapp/react-renderer", "react", "react/jsx-runtime", "lodash", "blockly", "blockly/core", "blockly/javascript"],
};
