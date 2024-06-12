const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/mod.ts",
  experiments: {
    outputModule: false,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "mod.js",
    clean: true,
    library: {
      type: "commonjs2",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /.([cm]?ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      // 	test: /\.ttf$/,
      // 	use: ['file-loader']
      // }
    ],
  },
  externalsType: "commonjs",
  externals: {
    "@ruiapp/move-style": "@ruiapp/move-style",
    react: "react",
    "react-dom": "react-dom",
  },
};
