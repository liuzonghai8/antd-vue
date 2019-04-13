module.exports = {
  "presets": [
    "@vue/app"
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "ant-design-vue",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}

// , {
//   polyfills: [
//     'es6.promise',
//     'es6.symbol'
//   ]
// }targets: {
  // "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
// }