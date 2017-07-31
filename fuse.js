const {BabelPlugin, CSSModules, CSSPlugin, EnvPlugin, FuseBox, JSONPlugin, PostCSSPlugin, RawPlugin, WebIndexPlugin} = require("fuse-box")

const resolveId = require('postcss-import/lib/resolve-id');

const path = require('path')

const production = false

const POSTCSS_PLUGINS = [
  require("postcss-import")({
    root: path.join(__dirname, "ui"),
    resolve: (id, base, options) => resolveId(id, options.root, options),
  }),
  require("postcss-cssnext")({
    browsers: ["ie >= 11", "last 2 versions"],
  }),
]

const fuse = FuseBox.init({
  experimentalFeatures: true,
  target: 'browser',
  homeDir: "ui",
  output: "build/$name.js",
  log: true,
  debug: true,
  plugins: [
    BabelPlugin(),
    EnvPlugin({NODE_ENV: production ? "production" : "development"}),
    RawPlugin(),
    [PostCSSPlugin(POSTCSS_PLUGINS), CSSModules(), CSSPlugin()],
    JSONPlugin(),
    WebIndexPlugin({
      title: "React Code Splitting demo",
      template: "ui/index.html",
      path: "/ui/assets/"
    })
  ]
})
fuse.bundle("app")
  .instructions(`>index.tsx`)

fuse.dev({
  open: false,
  port: 8085,
  root: 'build',
})
fuse.run()