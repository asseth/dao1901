const {CSSModules, CSSPlugin, EnvPlugin, FuseBox, JSONPlugin, PostCSSPlugin, WebIndexPlugin} = require("fuse-box")
const express = require('express')
const resolveId = require('postcss-import/lib/resolve-id')
const path = require('path')
const production = false

const POSTCSS_PLUGINS = [
  require("postcss-import")({
    root: path.join(__dirname, "src", "ui"),
    resolve: (id, base, options) => resolveId(id, options.root, options),
  }),
  require("postcss-cssnext")({
    browsers: ["ie >= 11", "last 2 versions"],
  })
]

const fuse = FuseBox.init({
  cache: true,
  experimentalFeatures: true,
  target: 'browser',
  homeDir: 'src',
  modulesFolder: 'customModules',
  output: 'build/$name.js',
  log: true,
  debug: true,
  plugins: [
    EnvPlugin({NODE_ENV: production ? "production" : "development"}),
    [/components.*\.css$/, PostCSSPlugin(POSTCSS_PLUGINS), CSSModules(), CSSPlugin()],
    [PostCSSPlugin(POSTCSS_PLUGINS), CSSPlugin()],
    JSONPlugin(),
    WebIndexPlugin({
      template: "src/ui/index.html",
      path: "src/ui/assets/"
    })
  ]
})
const app = fuse.bundle("app")
  .instructions(`> ui/index.tsx`)

if (!production) { app.watch('**').sourceMaps(true) }

fuse.dev({ open: false, port: 8085, root: 'build' }, server => {
  const dist = path.resolve("./src")
  const app = server.httpServer.app
  app.use("/images/", express.static(path.join(dist,'ui/assets/images')))
  app.use("/fonts/", express.static(path.join(dist,'ui/assets/fonts')))
})

fuse.run()