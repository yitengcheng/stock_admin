import React from 'react';
import { Form } from 'antd';
import { DatePicker } from '../antdComponents';
const { RangePicker } = DatePicker;

export default (props: any) => {
  const { label, name, required = true, rule = [] } = props;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <RangePicker allowClear />
    </Form.Item>
  );
};
