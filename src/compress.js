const fs = require("fs");
const path = require("path");

module.paths.push(path.resolve(__dirname, '../node_modules'));

const UglifyJS = require("uglify-js");
const UglifyCSS = require("uglifycss");
const { convertFont } = require("./convertbase64.js");

const ROOT_PATH = path.resolve(__dirname, "../");

let defaultCSSOption = {
    "entry": [
        "./examples/css/font-awesome.css"
    ],
    "output": {
        "filename": "app.min.css",
        "path": "./examples/compress/css"
    },
    "convertRelativePath": true,
    "convertFontToBase64": false,
    // "convertFontToBase64": {
    //     "types": [".woff2", ".woff"],
    //     "limit": 204800
    // }
};

function Compress(option) {
    console.log("----------初始化------------");
    this.opt = option;
    this.cssOpt = [];
    this.jsOpt = [];
    // init
    this.initFolder();
    console.log("----------初始化完成------------");
}
Compress.prototype.initFolder = function () {
    // 区分css文件和js文件
    this.opt.forEach(function (conf, index) {
        /.+\.js$/g.test(conf.entry)
            ? this.jsOpt.push(conf)
            : this.cssOpt.push(conf);
    }, this);
    return this;
};
Compress.prototype.mkdirOfOutput = function (output) {
    let outputPath = path.resolve(ROOT_PATH, output);
    // 创建输出路径
    !fs.existsSync(outputPath)
        ? (function () {
            let dirList = output.split("/");
            let first = ROOT_PATH;
            dirList.forEach(function (dir, n) {
                //debugger
                !fs.existsSync(path.resolve(first, dir)) ? fs.mkdirSync(path.resolve(first, dir)) : 0;
                first = path.resolve(first, dir);
            });
        }())
        : 0;
};
Compress.prototype.compressJS = function () {
    let len=this.jsOpt.length;
    this.jsOpt.forEach(function (conf, index) {
        console.log(`----------JS 压缩中 ${+1+index}/${len}------------`);
        // 创建输出路径
        this.mkdirOfOutput(conf.output.path);
        // 压缩混淆
        let res = UglifyJS.minify(conf.entry.map(function (url, n) {
            return fs.readFileSync(url, "utf-8");
        }),
            {
                sourceMap: conf.sourceMap ? {
                    includeSources: true,
                    filename: `${conf.output.filename}.map`,
                    url: `${conf.output.filename}.min.map`,
                    // root: string;
                    // content: RawSourceMap;
                } : false,
                output: {
                    comments: /license/i
                }
            });
        // 输出
        // sourceMap
        conf.sourceMap && fs.writeFileSync(`${path.resolve(ROOT_PATH, conf.output.path)}/${conf.output.filename}.map`, res.map, "utf-8");
        // min code
        fs.writeFileSync(`${path.resolve(ROOT_PATH, conf.output.path)}/${conf.output.filename}`, res.code, "utf-8");
    }, this);
    console.log("----------JS 压缩完成------------");
    return this;
};
Compress.prototype.minifyCSS = function () {
    let len=this.cssOpt.length;
    this.cssOpt.forEach(function (conf, index) {
        console.log(`----------CSS 压缩中 ${+1+index}/${len}------------`);
        // conf=Object.assign(JSON.parse(JSON.stringify(defaultCSSOption)),conf);
        // 创建输出路径
        this.mkdirOfOutput(conf.output.path);
        // 必须是相对路径，才能够转base64
        if (typeof conf.convertFontToBase64==="object") {
            conf.convertRelativePath = false;
        }
        // 压缩
        var res = UglifyCSS.processFiles(conf.entry,
            {
                // maxLineLen: 5,
                // convertUrls:conf.convertAbsolutePath?path.resolve(ROOT_PATH,"./examples"):"",
                convertUrls: conf.convertRelativePath ? conf.entry[0] : false
                // output:"js",
                // expandVars: true
                // uglyComments: true,
                // cuteComments: true,
            }
        );
        // ?转换字体为base64格式
        conf.convertFontToBase64 && (res = convertFont({
            txt: res,
            cssPath: path.resolve(ROOT_PATH, conf.entry[0]), // BUG 
            option: conf.convertFontToBase64
        }));
        // ?转换图片为base64格式 [TODO]

        //输出
        fs.writeFileSync(`${path.resolve(ROOT_PATH, conf.output.path)}/${conf.output.filename}`, res, "utf-8");
    }, this);
    console.log("----------CSS 压缩完成------------");
    return this;
};

module.exports = Compress;