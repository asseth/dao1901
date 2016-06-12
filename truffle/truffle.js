module.exports = {
  build: {
    "index.html": "index.html",
    "monitor.html": "monitor.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  deploy: [
    "Dao1901"
  ],
  rpc: {
    host: "localhost",
    port: 8545
  }
};
