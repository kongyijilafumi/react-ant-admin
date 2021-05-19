const path = require("path");
const fs = require("fs");
const { generateTheme } = require("antd-theme-generator");

const varFile = path.join(__dirname, "./src/assets/theme/var.less");
// 读取less变量文件 提取变量 信息
fs.readFile(varFile, "utf-8", function name(err, data) {
  if (err) {
    throw err;
  }
  let varStrArr = data.split(/\n/);
  let scipteReg = /\/\/\s+script/g;
  let slice = [];
  varStrArr.forEach((i, index) => {
    if (scipteReg.test(i)) {
      slice.push(index);
    }
  });
  varStrArr = varStrArr.slice(...slice).filter((i) => i[0] === "@");
  let colorsReg = /(.*?)\s*:\s*(.*?);\s*\/\/\s*([\u4e00-\u9fa5]*)/g;
  let varColors = [];
  varStrArr.forEach((item) => {
    colorsReg.lastIndex = 0;
    let execRes = colorsReg.exec(item);
    if (execRes) {
      varColors.push({
        title: execRes[3],
        key: execRes[1],
        value: execRes[2],
      });
    }
  });
  var tips = "\n // 本文件由脚本自动生成";
  let exportStr = "module.exports=" + JSON.stringify(varColors) + tips;
  fs.writeFile("./color.json.js", exportStr, function (err) {
    err && console.log(err);
  });

  // 使用 antd-theme-generator
  const options = {
    antDir: path.join(__dirname, "./node_modules/antd"),
    stylesDir: path.join(__dirname, "./src"),
    varFile,
    themeVariables: varColors.map((i) => i.key), //需要动态切换的主题变量
    indexFileName: "index.html",
    outputFilePath: path.join(__dirname, "./public/color.less"),
  };

  generateTheme(options)
    .then((less) => {
      console.log("Theme generated successfully");
    })
    .catch((error) => {
      console.log("Error", error);
    });
});
