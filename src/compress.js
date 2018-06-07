const fs = require("fs");
const path = require("path");

module.paths.push(path.resolve(__dirname, '../node_modules'));

const UglifyJS = require("uglify-js");
const UglifyCSS = require("uglifycss");

const ROOT_PATH = path.resolve(__dirname, "../");

function Compress(option) {
    this.opt = option;
    this.cssOpt = [];
    this.jsOpt = [];
    // init
    this.initFolder();
}
Compress.prototype.initFolder = function () {
    // 区分css文件和js文件
    this.opt.forEach(function (conf, index) {
        /.+\.js/g.test(conf.entry)
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
    this.jsOpt.forEach(function (conf, index) {
        // 创建输出路径
        this.mkdirOfOutput(conf.output.path);
        // 压缩混淆
        let res = UglifyJS.minify(conf.entry.map(function (url, n) {
            return fs.readFileSync(url, "utf-8");
        }),
            {
                sourceMap:conf.sourceMap?{
                    includeSources: true,
                    filename: `${conf.output.filename}.map`,
                    url: `${conf.output.filename}.min.map`,
                    // root: string;
                    // content: RawSourceMap;
                }:false,
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
    return this;
};
Compress.prototype.minifyCSS = function () {
    this.cssOpt.forEach(function (conf, index) {
        // 创建输出路径
        this.mkdirOfOutput(conf.output.path);
        // 压缩
        var res = UglifyCSS.processFiles(conf.entry,
            {
                // maxLineLen: 5,
                convertUrls:conf.convertAbsolutePath?path.resolve(ROOT_PATH,"./examples"):"",
                // output:"js",
                // expandVars: true
                // uglyComments: true,
                // cuteComments: true,
            }
        );
        //输出
        fs.writeFileSync(`${path.resolve(ROOT_PATH, conf.output.path)}/${conf.output.filename}`, res, "utf-8");
    }, this);

    return this;
};

module.exports = Compress;