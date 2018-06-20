const Compress = require("./compress.js");
const config = require("../config.json");

new Compress(config)
    .minifyCSS()
    .compressJS();