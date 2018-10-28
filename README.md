## yan-compressor ![NPM version](https://img.shields.io/npm/v/yan-compressor.svg?style=flat)

The compressor based on UglifyJS and UglifyCSS

### Installation
```bash
$ npm install yan-compressor
```

### API

First, create the file "json" in the root directory

```js
[
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
]
```

Then execute the following command

```bash
$ compress
```

If you just want to compress part of files, execute the following command

```bash
$ compress -css
```

```bash
$ compress -js
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

### MIT license
Copyright (c) 2018 Yangfan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0
