/**
 * BUG 1. 必须是压缩后的文件
 *     2. 必须去除所有注释
 */

const fs = require('fs');
const path = require('path');
module.paths.push(path.resolve(__dirname, '../node_modules'));
const mineType = require("mime-types");

const FONT_TYPES=[".woff",".woff2",".ttf",".eot",".svg"];

module.exports = {
    convertFont: function ({txt,cssPath,option}) {
        let url = {}; // cache font-url
        // 转换路径
        cssPath=path.parse(cssPath).dir;
        // repalce
        txt = txt.replace(/(?:url\()([^\)]+)\)/g, function ($1, $2, index, all) {
            var initStr=`url(${$2})`;
            url[`URL_${index}`] = path.resolve(cssPath,$2.replace(/[\'\"]+|(\?.*$)/g, ""));
            // 判断文件类型
            var ext=path.parse(url[`URL_${index}`]).ext;
            // 判断是否是字体文件
            if (!~(FONT_TYPES.indexOf(ext))) {
                console.warn(`WARNING: ${ext} 此类型不属于字体文件`);
                return initStr;
            }
            // 判断是否在转换范围
            if (!~(option.types.indexOf(ext))) {
                console.warn(`WARNING: ${ext} 此文件类型不在转换范围内`);
                return "url(OUT_RANGE)";
            }
            // 读取字体文件
            var fontPath = path.resolve(cssPath, url[`URL_${index}`]);
            // 获取字体文件信息
            var fontFileInfo = fs.statSync(fontPath);
            if (fontFileInfo.size>option.limit) {
                console.log(`WARNING: 文件超限，无法转换 path: ${fontPath}`);
                return initStr;
            }
            var fontData = fs.readFileSync(fontPath);
            // 转成base64
            fontData = new Buffer(fontData).toString('base64');
            // 返回替换
            return `url('data:${mineType.lookup(fontPath)};base64,${fontData}')`;
        });
        // 删除无用的字体路径和格式
        txt=txt.replace(/,?url\(OUT_RANGE\)\s+format\([^\)]+\)/g,"");

        return txt;
    }
}