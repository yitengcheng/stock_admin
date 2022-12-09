import React from 'react';
import { Form, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';

export default (props: any) => {
  const { label, name, required = true, rule = [], placeholder, ...other } = props;
  const place = placeholder ?? `请选择${label}`;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <DatePicker locale={locale} allowClear placeholder={place} {...other} />
    </Form.Item>
  );
};
