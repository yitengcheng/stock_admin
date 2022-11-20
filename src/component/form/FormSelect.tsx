import { Form, Select } from 'antd';
import React from 'react';
import { randomKey } from '../../utils';
const { Option } = Select;

export default (props: any) => {
  /**
   * option = [{label:string,value: string|number}]
   */
  const { label, name, required = true, rule = [], placeholder, options = [], mode } = props;
  const place = placeholder ?? `请选择${label}`;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <Select allowClear placeholder={place} mode={mode}>
        {options.map((option) => (
          <Option key={randomKey()} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
