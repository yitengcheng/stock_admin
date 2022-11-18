import { Form, Switch } from 'antd';
import React from 'react';
import { randomKey } from '../../utils';

export default (props: any) => {
  const { label, name, required = true, rule = [], options = ['', ''], mode } = props;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <Switch checkedChildren={options[0]} unCheckedChildren={options[1]} />
    </Form.Item>
  );
};
