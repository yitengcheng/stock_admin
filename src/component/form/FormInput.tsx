import { Form, Input } from 'antd';
import React from 'react';

export default (props: any) => {
  const { label, name, required = true, rule = [], placeholder, ...otherProps } = props;
  const place = placeholder ?? `请输入${label}`;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <Input allowClear placeholder={place} {...otherProps} />
    </Form.Item>
  );
};
