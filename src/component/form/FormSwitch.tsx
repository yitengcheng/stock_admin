import { Form, Switch } from 'antd';
import React from 'react';

export default (props: any) => {
  const { label, name, required = true, rule = [], options = ['', ''] } = props;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <Switch checkedChildren={options[0]} unCheckedChildren={options[1]} />
    </Form.Item>
  );
};
