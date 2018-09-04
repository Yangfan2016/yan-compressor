const fs = require("fs");
const path = require("path");

function copy(src, tar) {
    if (!fs.existsSync(src)) {
        console.log("源目录不存在");
        return;
    }
    if (!fs.existsSync(tar)) {
        console.log("目标目录不存在");
        return;
    }

    var tarDir = path.join(tar, path.parse(src).base);
    var filelist = fs.readdirSync(path.resolve(src));

    for (let i = 0; i < filelist.length; i++) {
        let rPath = path.join(src, filelist[i]);
        let wPath = path.join(tarDir, filelist[i]);
        // read
        let data = fs.readFileSync(rPath);
        // mkdir
        if (!fs.existsSync(tarDir)) {
            fs.mkdirSync(tarDir)
        };
        // write
        fs.writeFileSync(wPath, data);
    }
}

module.exports = copy;