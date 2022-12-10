import { Form, Select } from 'antd';
import React from 'react';

export default (props: any) => {
  /**
   * option = [{label:string,value: string|number}]
   */
  const { label, name, required = true, rule = [], placeholder, options = [], mode, onChange, ...other } = props;
  const place = placeholder ?? `请选择${label}`;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <Select
        allowClear
        placeholder={place}
        mode={mode}
        showSearch
        filterOption={(input, option) => (option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
        onChange={(value) => {
          onChange && onChange(value);
        }}
        options={options}
        {...other}
      />
    </Form.Item>
  );
};
