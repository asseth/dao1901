const {CSSModules, CSSPlugin, EnvPlugin, FuseBox, JSONPlugin, PostCSSPlugin, WebIndexPlugin, Sparky} = require("fuse-box")
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
      path: "/"
    })
  ]
})
const app = fuse.bundle("assets/app")
  .instructions(`> ui/index.tsx`)

if (!production) { app.watch('**').sourceMaps(true) }

Sparky.task('clean', () => Sparky.src(path.resolve("build")).clean(path.resolve("build")));
Sparky.task('copy-assets', () => Sparky.src("assets/**/*.*", { base: "./src/ui"}).dest("build"));
Sparky.task('run', ['clean', 'copy-assets'], () => {
  fuse.dev({ open: false, port: 8085, root: 'build' }, server => {
    const dist = path.resolve("src")
    const build = path.resolve("build")

    const app = server.httpServer.app
    app.use("/assets/", express.static(path.join(build,'assets')));
    app.get("*", function(req, res) {
      res.sendFile(path.resolve("build", "index.html"));
    })
  })

  fuse.run()
});

Sparky.task('default', ['run'], () => {});