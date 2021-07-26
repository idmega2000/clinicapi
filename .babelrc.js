module.exports = {
    "presets": [
      ["env", {
        "targets": {
          "node": "current"
        }
      }]
    ],
    "plugins": [
        "@babel/plugin-proposal-object-rest-spread",
        ["module-resolver", {
          "root": ["./src"]
        }]
      ]
  }