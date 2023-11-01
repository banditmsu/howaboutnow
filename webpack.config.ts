const path = require('path');

module.exports = {
  devtool: "inline-source-map",
  entry: {
    app: [
     resolve('./src/main.ts')
    ]
  }
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'), // specify output path
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          "thread-loader",
          "ts-loader"
        ],
      },
      // Add babel-loader if you're using React
      // {
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   exclude: /node_modules/,
      //   use: 'babel-loader',
      // },
    ],
  },
};
