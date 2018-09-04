## yan-compressor ![NPM version](https://img.shields.io/npm/v/yan-compressor.svg?style=flat)

The compressor based UglifyJS and UglifyCSS

### Installation
```bash
$ npm install yan-compressor
```

### API
First,edit file "config.json"
```js
// The config of js
{
    "entry": [ // entry :string[]
        "./examples/libs/jquery.js",
        "./examples/libs/vue.js"
    ],
    "output": {
        "filename": "vendor.min.js",
        "path": "./examples/compress/js"
    },
    "sourceMap": true // make map file of js
},
// The config of CSS
{
    "entry": [ // entry :string[]
        "./examples/css/font-awesome.css"
    ],
    "output": {
        "filename": "app.min.css",
        "path": "./examples/compress/css"
    },
    "convertRelativePath": true, // convert to relative url for source css
    "convertFontToBase64": { // convert font|image to base64 
        "types": [".woff2", ".woff"],
        "limit": 204800
    }
}
```

Then execute the following command

```bash
compress # default
compress -css # only css
compress -js # only js
```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### ISC license
Copyright (c) 2018 Yangfan



---
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0
