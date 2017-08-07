const {CSSModules, CSSPlugin, CSSResourcePlugin, EnvPlugin, FuseBox, JSONPlugin, QuantumPlugin, PostCSSPlugin, WebIndexPlugin, Sparky} = require("fuse-box")
const express = require('express')
const resolveId = require('postcss-import/lib/resolve-id')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production' ? true : false

const POSTCSS_PLUGINS = [
  require("postcss-import")({
    root: path.join(__dirname, "src", "ui"),
    resolve: (id, base, options) => resolveId(id, options.root, options),
  }),
  require("postcss-cssnext")({
    browsers: ["ie >= 11", "last 2 versions"],
  })
]

Sparky.task('default', ['clean', 'copy-assets', 'build'], () => {})
Sparky.task('clean', () => Sparky.src(path.resolve("build")).clean(path.resolve("build")))
Sparky.task('clean-cache', () => Sparky.src(".fusebox/*").clean(".fusebox/"))
Sparky.task('copy-assets', () => Sparky.src("assets/**/**.*", {base: "./src/ui"}).dest("build"))
Sparky.task('build', () => {
  const fuse = FuseBox.init({
    alias: {
      "reactstrap-tether": '~/node_modules/reactstrap-tether/src/js/tether.js',
      "../../../customModules/protocol/index.js": "protocol/index.js",
      "../../../customModules/protocol/truffle.js": "protocol/truffle.js"
    },
    cache: !isProduction,
    experimentalFeatures: true, // remove next major release of fb
    target: 'browser',
    homeDir: 'src',
    modulesFolder: 'customModules',
    output: 'build/$name.js',
    log: true,
    debug: true,
    sourceMaps: !isProduction,
    useJsNext: false,
    plugins: [
      EnvPlugin({NODE_ENV: isProduction ? "production" : "development"}),
      [/components.*\.css$/, PostCSSPlugin(POSTCSS_PLUGINS), CSSModules(), CSSPlugin()],
      [PostCSSPlugin(POSTCSS_PLUGINS), CSSResourcePlugin({inline: true}), CSSPlugin()], // todo remove font-awesome from the bundle
      JSONPlugin(),
      WebIndexPlugin({
        template: "src/ui/index.html",
        path: "."
      }),
      isProduction && QuantumPlugin({
        api: (core) => {
          core.solveComputed("bn.js/lib/bn.js")
        },
        bakeApiIntoBundle: 'assets/app',
        ensureES5 : true,
        removeExportsInterop: false,
        treeshake: true,
        uglify: true
      })
    ]
  })

  !isProduction && fuse.dev({ open: false, port: 8085, root: 'build' }, server => {
    const build = path.resolve("build")
    const app = server.httpServer.app
    app.use("/assets/", express.static(path.join(build,'assets')))
    app.get("*", function(req, res) {
      res.sendFile(path.resolve("build", "index.html"))
    })
  })

  const app = fuse.bundle("assets/app")
    .instructions(`>ui/index.tsx`)

  !isProduction && app.watch('**')

  fuse.run()
})