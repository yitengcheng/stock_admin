import { Form, Radio } from 'antd';
import React from 'react';
import { randomKey } from '../../utils';
const { Group } = Radio;

export default (props: any) => {
  const {
    label,
    name,
    required = true,
    rule = [],
    options = [
      { value: false, label: '否' },
      { value: true, label: '是' },
    ],
    mode,
  } = props;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <Group allowClear mode={mode}>
        {options.map((option) => (
          <Radio key={randomKey()} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Group>
    </Form.Item>
  );
};
