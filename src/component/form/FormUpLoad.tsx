import { Button, Form, Upload } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { getStorage } from '../../localStorage';

export default (props: any) => {
  const { label, name, required = true, rule = [], url, maxCount = 5, ...otherProps } = props;

  const normFile = (result: any) => {
    if (Array.isArray(result)) {
      return result;
    }
    return result?.fileList;
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required }, ...rule]}
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload
        action={`/api${url}`}
        listType="picture"
        maxCount={maxCount}
        headers={{
          Authorization: `Bearer ${getStorage('token')}`,
        }}
        {...otherProps}
      >
        <Button icon={<UploadOutlined />}>点击上传</Button>
      </Upload>
    </Form.Item>
  );
};
