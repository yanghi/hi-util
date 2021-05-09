import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
const name = pkg.name
const resolve = (p) => path.resolve(__dirname, p)
function createConfig(fmt, options = {}) {
  const extraPlugins = options.plugins || []
  delete options.plugins
  const shouldDeclaration = process.env.NODE_ENV === 'production'
  return {
    input: './src/index.ts',
    output: {
      file: resolve(`dist/${name}.${fmt}.bundle.js`),
      format: fmt
    },
    plugins: [
      commonjs(),
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
        tsconfigOverride: {
          compilerOptions: {
            declaration: shouldDeclaration
          }
        }
      }),
      ...extraPlugins
    ],
    ...options
  }
}
var configs = [createConfig('cjs', {}), createConfig('es')]
if (process.env.NODE_ENV === 'production') {
  const { terser } = require('rollup-plugin-terser')
  ;['cjs', 'es'].forEach((fmt) => {
    configs.push(
      createConfig('', {
        output: {
          file: resolve(`dist/${name}.${fmt}.prod.js`),
          format: fmt
        },
        plugins: [
          terser({
            module: /^esm/.test(fmt),
            compress: {
              ecma: 2015,
              pure_getters: true
            },
            safari10: true
          })
        ]
      })
    )
  })
}

export default configs
