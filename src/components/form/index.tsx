import { ReactNode, useEffect, useState } from "react";
import { Form, Input, Select, Radio, Switch, InputNumber, FormInstance } from "antd";

interface MyFormProps {
  handleInstance: (form: FormInstance) => void
  items: FormItemData[]
  [key: string]: any
}
export interface FormItemData {
  itemType: string
  childProps?: {
    [key: string]: any
  }
  itemProps: {
    rules?: {
      required?: boolean
      message: string
      [key: string]: any
    }[]
    label?: string
    name: string
    [key: string]: any
  }
}

function getChild(type: string): any {
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
    default:
      return null;
  }
}
function renderItem({ itemType, childProps, itemProps }: FormItemData) {
  const Child = getChild(itemType);
  if (!Child) return Child;
  return (
    <Form.Item {...itemProps} key={itemProps.name}>
      <Child {...childProps} />
    </Form.Item>
  );
}

export default function MyForm({ items, handleInstance, ...props }: MyFormProps) {
  const [formInstance] = Form.useForm();
  const [formBody, setFormBody] = useState<ReactNode | null>(null);
  useEffect(() => {
    if (formInstance && typeof handleInstance === "function") {
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
    </Form>
  );
}
