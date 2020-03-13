import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import Config from 'webpack-chain'
// noinspection TypeScriptPreferShortImport
import {vueConfig, tsConfig, urlConfig, cssConfig, pugConfig, aliasConfig} from './webpack-chains'

interface EnvOptions {
  prod?: boolean
  dev?: boolean
}

export const chainConfig = (env: EnvOptions = {}): Config => {

  const config = new Config()

  config.resolve.extensions.add('.ts').add('.js')

  config.mode(env.prod ? 'production' : 'development')

  config.devtool(env.prod ? 'source-map' : 'cheap-module-eval-source-map')

  config.entry('main').add(path.resolve(__dirname, './src/main.js'))

  config.output
    .path(path.resolve(__dirname, './dist'))
    .publicPath('/dist/')

  // dev server setting
  config.devServer
    .inline(true)
    .hot(true)
    .stats('minimal')
    .contentBase(__dirname)
    .overlay(true)

  aliasConfig(config)

  vueConfig(config)

  tsConfig(config)

  cssConfig(config)

  urlConfig(config)

  // pugConfig(config)

  return config
}

module.exports = (env: EnvOptions  = {}) => {
  return chainConfig(env).toConfig()
}

