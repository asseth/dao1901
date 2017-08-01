const {CSSModules, CSSPlugin, EnvPlugin, FuseBox, JSONPlugin, PostCSSPlugin, RawPlugin, WebIndexPlugin} = require("fuse-box")
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
  }),
]

const fuse = FuseBox.init({
  cache: false,
  experimentalFeatures: true,
  target: 'browser',
  homeDir: 'src',
  modulesFolder: 'customModules',
  output: 'build/$name.js',
  log: false,
  debug: true,
  plugins: [
    EnvPlugin({NODE_ENV: production ? "production" : "development"}),
    //RawPlugin(),
    //[CSSModules(), CSSPlugin()],
    [PostCSSPlugin(POSTCSS_PLUGINS), CSSModules(), CSSPlugin()],
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
  app.use("/static/", express.static(path.join(dist,'ui/assets/images')));
})

fuse.run()