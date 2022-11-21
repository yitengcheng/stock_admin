import { Form, Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

export default (props: any) => {
  const { label, name, required = true, rule = [], placeholder, ...otherProps } = props;
  const place = placeholder ?? `请输入${label}`;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <TextArea allowClear placeholder={place} {...otherProps} />
    </Form.Item>
  );
};
