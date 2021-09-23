import { useEffect, useState } from "react";
import { Form, Input, Select, Radio, Switch, InputNumber } from "antd";

function getChild(type) {
  switch (type) {
    case "input":
      return Input;
    case "select":
      return Select;
    case "radio":
      return Radio.Group;
    case "switch":
      return Switch;
    case "inputNumber":
      return InputNumber;
    case "inputText":
      return Input.TextArea
    default:
      return null;
  }
}
function renderItem({ itemType, childProps, itemProps }) {
  const Child = getChild(itemType);
  if (!Child) return Child;
  return (
    <Form.Item {...itemProps} key={itemProps.name}>
      <Child {...childProps} />
    </Form.Item>
  );
}

export default function MyForm({ items, handleInstance, children, ...props }) {
  const [formInstance] = Form.useForm();
  const [formBody, setFormBody] = useState(null);
  useEffect(() => {
    if (formInstance && handleInstance) {
      handleInstance(formInstance);
    }
  }, [formInstance, handleInstance]);
  useEffect(() => {
    if (Array.isArray(items) && items.length) {
      const body = items.map(renderItem).filter(Boolean);
      setFormBody(body);
    }
  }, [items]);
  return (
    <Form className="myForm" form={formInstance} {...props}>
      {formBody}
      {children}
    </Form>
  );
}
