import React from "react";
import { Form, DatePicker } from "antd";
const { RangePicker } = DatePicker;

export default (props: any) => {
  const { label, name, required = true, rule = [] } = props;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <RangePicker allowClear />
    </Form.Item>
  );
};
