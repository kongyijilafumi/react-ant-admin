const path = require("path");
const fs = require("fs");
const { generateTheme, getLessVars } = require("ant-theme-generator");

const showColorSet = process.env.COLOR === "true";

// 变量文件夹
const varFile = path.join(__dirname, "./src/assets/theme/var.less");
const varJsonPath = path.join(__dirname, "./color.json.js");
const outputFilePath = path.join(__dirname, "./public/color.less");
// antd 默认主题 json 文件
const defaultPath = path.join(__dirname, "./src/assets/theme/default.json");
const darkPath = path.join(__dirname, "./src/assets/theme/dark.json");
// antd 主题 less文件
const antdDefaultPath = "./node_modules/antd/lib/style/themes/default.less";
const antdDarkPath = "./node_modules/antd/lib/style/themes/dark.less";
const antdLightPath = "./node_modules/antd/lib/style/themes/compact.less";

function colorStart() {
  try {
    var varStr = fs.readFileSync(varFile, "utf-8");
  } catch (error) {
    throw error;
  }

  // 读取less变量文件 提取变量 信息
  let varStrArr = varStr.split(/\n/);
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
  // 变量配置信息 写入 color.json.js 文件
  var tips = "\n// 本文件由脚本自动生成";
  let exportStr = "module.exports=" + JSON.stringify(varColors) + tips;
  fs.writeFileSync(varJsonPath, exportStr);
  const defaultVars = getLessVars(antdDefaultPath);
  const darkVars = {
    ...getLessVars(antdDarkPath),
    "@primary-color": defaultVars["@primary-color"],
    "@picker-basic-cell-active-with-range-color": "darken(@primary-color, 20%)",
  };
  const lightVars = {
    ...getLessVars(antdLightPath),
    "@primary-color": defaultVars["@primary-color"],
  };
  const configVars = reduceMap(varColors, "key", "value");
  try {
    // 写入json文件
    fs.writeFileSync(
      defaultPath,
      JSON.stringify({
        ...defaultVars,
        ...lightVars,
        ...configVars,
      })
    );
    fs.writeFileSync(
      darkPath,
      JSON.stringify({
        ...defaultVars,
        ...darkVars,
        ...configVars,
      })
    );
  } catch (error) {
    throw error;
  }

  // 使用 antd-theme-generator
  const options = {
    antDir: path.join(__dirname, "./node_modules/antd"),
    stylesDir: path.join(__dirname, "./src"),
    varFile,
    themeVariables: Array.from(
      new Set([
        ...Object.keys(darkVars),
        ...Object.keys(lightVars),
        ...Object.keys(defaultVars),
        ...varColors.map((i) => i.key),
      ])
    ), //需要动态切换的主题变量
    indexFileName: "index.html",
    outputFilePath,
  };

  generateTheme(options)
    .then((less) => {
      console.log("Theme generated successfully");
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

function reduceMap(listObj, key, value) {
  return listObj.reduce((a, c) => {
    a[c[key]] = c[value];
    return a;
  }, {});
}

function delFile(path) {
  if (typeof path === "string") {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
    return;
  }
  if (Array.isArray(path)) {
    path.forEach((item) => delFile(item));
  }
}

if (showColorSet) {
  colorStart();
} else {
  delFile([varJsonPath, outputFilePath, defaultPath, darkPath]);
}
