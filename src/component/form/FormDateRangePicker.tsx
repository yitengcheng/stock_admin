import React from 'react';
import { Form, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';

export default (props: any) => {
  const { label, name, required = true, rule = [] } = props;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <RangePicker locale={locale} allowClear />
    </Form.Item>
  );
};
