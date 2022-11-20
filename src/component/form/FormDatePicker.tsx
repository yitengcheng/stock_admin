import React from "react";
import { Form, DatePicker } from "antd";

export default (props: any) => {
  const { label, name, required = true, rule = [], placeholder, ...other } = props;
  const place = placeholder ?? `请选择${label}`;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <DatePicker allowClear placeholder={place} {...other} />
    </Form.Item>
  );
};
