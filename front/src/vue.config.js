const { defineConfig } = require('@vue/cli-service')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: webpackConfig => {
    // cache-loader の無効化が必要です。そうしないと、クライアントのビルドはサーバのビルドから
    // キャッシュされたコンポーネントを使ってしまいます。
    webpackConfig.module.rule('vue').uses.delete('cache-loader')
    webpackConfig.module.rule('js').uses.delete('cache-loader')
    webpackConfig.module.rule('ts').uses.delete('cache-loader')
    webpackConfig.module.rule('tsx').uses.delete('cache-loader')

    if (!process.env.SSR) {
      // クライアント用エントリファイルの基点
      webpackConfig
        .entry('app')
        .clear()
        .add('./src/entry-client.js')
      return
    }

    // サーバ用エントリファイルの基点
    webpackConfig
      .entry('app')
      .clear()
      .add('./src/entry-server.js')

    // これにより webpack は Node に適した方法で動的インポートを扱うことができ、
    // Vue コンポーネントをコンパイルするときに、
    // サーバ向けのコードを発行するように 'vue-loader' に指示します。
    webpackConfig.target('node')
    // これは Node スタイルのエクスポートを使うようにサーバ用のバンドルに指示します。
    webpackConfig.output.libraryTarget('commonjs2')

    webpackConfig
      .plugin('manifest')
      .use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }))

    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // アプリケーションの依存関係を外部化します。
    // これによりサーバでのビルドがずっと速くなり、バンドルしたファイルのサイズも小さくなります。

    // webpack で処理する必要がある依存関係を外部化しないでください。
    // また `global` を変更する依存を許可リスト化する必要があります（Polyfill など）
    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }))

    webpackConfig.optimization.splitChunks(false).minimize(false)

    webpackConfig.plugins.delete('preload')
    webpackConfig.plugins.delete('prefetch')
    webpackConfig.plugins.delete('progress')
    webpackConfig.plugins.delete('friendly-errors')

    webpackConfig.plugin('limit').use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )
  }
})
