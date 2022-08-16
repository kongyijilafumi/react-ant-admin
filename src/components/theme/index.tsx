import { useCallback, useEffect, useState } from "react";
import { Drawer, Col, Row, message, Button, Radio, notification, RadioChangeEvent } from "antd";
import MyIcon from "@/components/icon";
import Color from "@/components/color";
import { getKey, setKey, rmKey } from "@/utils";

import "./index.less";

type ImportModule<T> = { default: T }

let varColors: Array<ThemeJSON> = [], darkTheme: ThemeJSON = {}, defaultTheme: ThemeJSON = {};
if (__IS_THEME__) {
  let colorDataModule = import.meta.globEager("/theme/colorData.json")["/theme/colorData.json"] as ImportModule<Array<ThemeJSON>>
  let darkThemeModule = import.meta.globEager("/theme/dark.json")["/theme/dark.json"] as ImportModule<ThemeJSON>
  let defaultThemeModule = import.meta.globEager("/theme/default.json")["/theme/default.json"] as ImportModule<ThemeJSON>
  varColors = colorDataModule.default
  darkTheme = darkThemeModule.default
  defaultTheme = defaultThemeModule.default
}


interface ThemeData {
  label: string
  value: string
  colorList: ThemeJSON
}
interface ThemeJSON {
  [key: string]: string
}
interface GetColor {
  background: string
}
type ThemeList = ThemeData[]
type ColorInfo = {
  pageX: number
  pageY: number
  key: string
  value: string
}

function findInfoColor(list: ThemeJSON[], obj: ThemeJSON) {
  return list.map((item) => {
    let key = item.key;
    let value = obj[key];
    if (value) {
      item.value = value;
    }
    return item;
  });
}



function setObjVal(list: ThemeJSON[], obj: ThemeJSON) {
  list.forEach((i) => {
    if (obj[i.key]) {
      obj[i.key] = i.value;
    }
  });
}

const getColor = (color: string): GetColor => ({
  background: color,
});



const Themes: ThemeList = [
  { label: "默认", value: "default", colorList: defaultTheme },
  { label: "暗黑", value: "dark", colorList: darkTheme },
];


const THEMENAMEKEY = "theme-name";
const THEMDATAKEY = "theme-data";
const THEME_NAME = getKey(true, THEMENAMEKEY);
const THEME: ThemeJSON = getKey(true, THEMDATAKEY);
const initSelectInfo = { key: '', value: '', pageX: 0, pageY: 0 }

export default function SetTheme() {
  const [visible, setVisible] = useState(false);
  const [selectInfo, setInfo] = useState<ColorInfo>(initSelectInfo);
  const [colorShow, setColorShow] = useState(false);
  const [colorList, setColor] = useState<Array<ThemeJSON>>(varColors);
  const [themeStyle, setStyle] = useState(THEME_NAME || Themes[0].value);
  // 关闭色板
  const onCloseColor = useCallback(() => {
    setInfo(initSelectInfo);
    setColorShow(false);
  }, []);

  // 设置主题
  const setTheme = useCallback((obj: ThemeJSON, list: Array<ThemeJSON>, tip = true) => {
    window.less
      .modifyVars(obj)
      .then(() => {
        tip && message.success("修改主题色成功");
        setColor(list);
        onCloseColor();
      })
      .catch((err: any) => {
        console.log(err);

        tip && message.error("修改失败");
      });
  }, [onCloseColor]);
  // 初始化主题
  useEffect(() => {
    if (THEME && THEME_NAME) {
      let newColorList = [...colorList.map((i) => ({ ...i }))];
      newColorList = findInfoColor(newColorList, THEME);
      let newColorObj = {
        ...Themes.find((i) => i.value === THEME_NAME)?.colorList,
      };
      setTheme(newColorObj, newColorList, false);
      setStyle(THEME_NAME);
    }
    // eslint-disable-next-line
  }, []);

  // 关闭抽屉
  const onClose = useCallback(() => setVisible(false), []);

  // 显示抽屉
  const showDrawer = useCallback(() => {
    setVisible(true);
  }, []);

  // 自定义颜色选中
  const onChangeComplete = useCallback((v: any, k: string) => {
    let newColorList = [...colorList.map((i) => ({ ...i }))];
    newColorList.forEach((i) => {
      if (i.key === k) {
        i.value = v.hex;
      }
    });
    let colorObj = {
      ...Themes.find((i) => i.value === themeStyle)?.colorList,
    };
    setObjVal(newColorList, colorObj);
    setTheme(colorObj, newColorList);
  }, [colorList, setTheme, themeStyle]);

  // 选中
  const onSelect = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>, info: any) => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    let { clientX: pageX, clientY: pageY } = e;
    if (pageY + 350 > height) {
      pageY -= 320;
    }
    if (pageX + 250 > width) {
      pageX -= 220;
    }
    setInfo({ ...info, pageX, pageY });
    setColorShow(true);
  }, []);

  // 保存本地
  const saveLocalTheme = useCallback(() => {
    let themeObj = { ...Themes.find((i) => i.value === themeStyle)?.colorList };
    themeObj = colorList.reduce((a, c) => {
      a[c.key] = c.value;
      return a;
    }, themeObj);
    setKey(true, THEMENAMEKEY, themeStyle);
    setKey(true, THEMDATAKEY, themeObj);
    message.success("主题成功保存到本地！");
  }, [themeStyle, colorList]);

  // 选择主题
  const themeChange = useCallback((e: RadioChangeEvent) => {
    const { value } = e.target;
    const colorObj = {
      ...Themes.find((i) => i.value === value)?.colorList,
    };
    setObjVal(colorList, colorObj);
    setTheme(colorObj, colorList);
    setStyle(value);
  }, [colorList, setTheme]);
  // 删除本地缓存主题
  const delTheme = () => {
    if (!getKey(true, THEMENAMEKEY)) {
      return notification.error({
        type: "error",
        description: "未找到本地有配置本地主题，请保存后再点击删除！",
        message: "删除失败",
      });
    }
    let initColorObj = { ...Themes[0].colorList };
    varColors.forEach((item) => {
      initColorObj[item.key] = item.value;
    });
    window.less
      .modifyVars(initColorObj)
      .then(() => {
        message.success("修改主题色成功");
        rmKey(true, THEMDATAKEY);
        rmKey(true, THEMENAMEKEY);
        setColor(varColors);
        setStyle(Themes[0].value);
      })
      .catch((err: any) => {
        message.error("修改失败");
        console.log(err);

      });
  };
  return (
    <div className="set-theme">
      <div className="icon" onClick={showDrawer}>
        <MyIcon type="icon_pen" />
      </div>
      <Drawer
        className="drawer"
        title="设置主题颜色"
        placement="right"
        closable={false}
        onClose={onClose}
        width={400}
        visible={visible}
      >
        <Radio.Group
          options={Themes}
          onChange={themeChange}
          value={themeStyle}
          optionType="button"
          buttonStyle="solid"
        />
        <Row className="color-row primary">自定义Less变量:</Row>
        {colorList.map((i) => (
          <Row className="color-row" justify="space-between" key={i.key}>
            <Col style={{ color: i.value }}>{i.title}:</Col>
            <Col
              className="color-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(e, i);
              }}
              style={getColor(i.value)}
            ></Col>
          </Row>
        ))}

        <Row justify="center">
          <Button type="primary" onClick={saveLocalTheme}>
            保存本地
          </Button>
          <Button type="ghost" className="del" danger onClick={delTheme}>
            删除本地颜色主题配置
          </Button>
        </Row>
        <Color
          pageX={selectInfo.pageX}
          pageY={selectInfo.pageY}
          color={selectInfo.value}
          colorKey={selectInfo.key}
          onSureChange={onChangeComplete}
          onClose={onCloseColor}
          isShow={colorShow}
        />
      </Drawer>
    </div>
  );
}
