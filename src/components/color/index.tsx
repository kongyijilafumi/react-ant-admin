import { useCallback, useEffect, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { Row, Col, Button } from "antd";
import "./index.less";


interface Position {
  left: number
  top: number
}

interface ColorProps {
  color: string
  pageX: number
  pageY: number
  onSureChange: (color: ColorResult, key: string) => void
  colorKey: string
  isShow: boolean
  onClose: () => void
}

const getPositon = (x: number, y: number): Position => ({ left: x, top: y });


function Color({
  color,
  pageX,
  pageY,
  onSureChange,
  colorKey,
  isShow,
  onClose,
}: ColorProps) {
  const [changeColor, setColor] = useState<ColorResult>({ hex: color } as ColorResult);

  // 变化重置
  useEffect(() => {
    if (color) {
      setColor({ hex: color } as ColorResult);
    }
  }, [color]);

  // 同步改变
  const onChange = useCallback((v: ColorResult) => setColor(v), []);

  // 确认
  const onChangeComplete = useCallback(() => {
    onSureChange(changeColor, colorKey);
  }, [changeColor, onSureChange, colorKey]);

  return (
    <Row
      className={isShow ? "fixed-wrapper show" : "fixed-wrapper"}
      style={getPositon(pageX, pageY)}
      onClick={(e) => e.stopPropagation()}
    >
      <Col>
        <SketchPicker color={changeColor.hex} onChange={onChange} />
      </Col>
      <Col>
        <Button type="primary" size="small" onClick={onChangeComplete}>
          确认
        </Button>
        <Button size="small" danger onClick={onClose}>
          取消
        </Button>
      </Col>
    </Row>
  );
}
export default Color