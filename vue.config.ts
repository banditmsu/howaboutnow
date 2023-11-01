

export default {(
  // Project deployment base
  publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',

  // Output directory for production build
  outputDir: 'dist',

  // Lint on save
  lintOnSave: process.env.NODE_ENV !== 'production',

  // TypeScript configurations
  transpileDependencies: [
    'vuetify',
    // add other dependencies that require transpiling here
  ],
  configureWebpack: {
    entry: './src/main.ts'  // or './src/index.ts' if that's your entry file
  }

  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: (tag) => /^v-edit-dialog/.test(tag)
        }
        return options
      })
  },

  // Dev server configurations
  devServer: {
    port: 8080,
    proxy: {
      // proxy configuration example
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      // },
    },
  },

  // PWA configurations
  pwa: {
    name: 'My App',
    themeColor: '#000000',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      // ...other Workbox options...
    },
  },

  // Use css modules or not
  css: {
    modules: false,
    sourceMap: true,
    loaderOptions: {
      // pass options to the preprocessor's loader here
    },


    
  },
});
