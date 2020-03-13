import Config from 'webpack-chain'
import VueLoaderPlugin from 'vue-loader/dist/plugin'
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

export function vueConfig(config: Config) {
  config.module.rule('vue')
    .test(/\.vue$/)
    .use('vue-loader')
    .loader('vue-loader')
  config.plugin('vue-plugin')
    .use(VueLoaderPlugin)
}

/**
 * pug building setting
 * @param config
 * @returns {*}
 */
export function pugConfig(config): Config {
  config.module.rule('pug')
    .test(/\.pug$/)
    .oneOf('vue-loader')
    .resourceQuery(/^\?vue/)
    .use('pug-plain')
    .loader('pug-plain-loader')
    .end()
    .end()

    .oneOf('raw-pug')
    .use('pug')
    .loader('pug-loader')
    .end()
    .end()
  return config
}

export function urlConfig(config: Config): Config {
  config.module.rule('url')
    .test(/\.png$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: 8192,
    })

  return config
}

export function cssConfig(config: Config) {
  config.module.rule('css')
    .test(/\.css$/)
    .use('css-loader')
    .loader('css-loader')
}

/**
 * javascript building setting
 * @param config
 * @returns {*}
 */
export function jsConfig(config: Config) {
  config.resolve.extensions.add('.js').add('.jsx')
  config.module.rule('js')
    .test(/\.jsx?$/)
    .exclude
    .add(/node_modules/)
    .end()
    .use('babel')
    .loader('babel-loader')
  return config
}

/**
 * tsConfig options
 */
interface TsConfigOptions {
  /**
   * do you want to use typescript type check
   * @default true
   */
  typeChecker?: boolean
}

/**
 * typescript building setting
 * @param config
 * @param options
 */
export function tsConfig(config: Config, options: TsConfigOptions = {}): Config {
  const {typeChecker = true} = options
  config.resolve.extensions.add('.ts').add('.tsx')
  config.module.rule('ts')
    .test(/\.tsx?$/)
    .use('babel').loader('babel-loader').end()

  /**
   * load type checker
   */
  if(typeChecker) {
    config.plugin('ts-checker')
      .use(ForkTsCheckerWebpackPlugin, [
        {
          vue: true,
          eslint: true,
          tsconfig: 'tsconfig.bundle.json',
        }])
  }
  return config
}

/**
 * stylus config
 * @param config
 * @return {*}
 */
function stylusConfig(config) {
  config.resolve.extensions.add('.styl').add('stylus')
  config.module.rule('stylus')
    .test(/\.styl(us)?$/)
    .end()
    .use('css-loader')
    .loader('css-loader')
    .end()
    .use('stylus')
    .loader('stylus-loader')
    .end()
    .end()
  return config
}

/**
 * aliasConfig function options
 */
interface AliasOptions {
  /**
   * do you want to add vue helper alias?
   * @default true
   */
  vue?: boolean

  /**
   * do you want to  add default alias?
   * @default true
   */
  defaultAlias?: boolean
}

/**
 * webpack alias setting
 * @param config webpack chain config
 * @param options config options
 */
export function aliasConfig(config: Config, options: AliasOptions = {}): Config {
  const {
    vue = true,
    defaultAlias = true,
  } = options

  if(vue) {
    // this isn't technically needed, since the default `vue` entry for bundlers
    // is a simple `export * from '@vue/runtime-dom`. However having this
    // extra re-export somehow causes webpack to always invalidate the module
    // on the first HMR update and causes the page to reload.
    config.resolve.alias.set('vue', '@vue/runtime-dom')
  }

  if(defaultAlias) {
    const alias = config.resolve.alias
    alias.set('src', 'src')
    alias.set('@', 'src')
  }

  return config
}
