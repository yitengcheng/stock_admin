import { Button, Form, Space } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import { removeStorage } from '../../localStorage';
import FormInput from '../form/FormInput';

export default (props: any) => {
  const { closeModal } = props;
  const [passwordForm] = Form.useForm();
  const navigator = useNavigate();

  const modifyPassword = () => {
    passwordForm.validateFields().then((value) => {
      post(apis.updatePwdEmployee, value).then(() => {
        passwordForm.resetFields();
        removeStorage('token');
        removeStorage('userInfo');
        navigator('/');
        closeModal && closeModal();
      });
    });
  };

  return (
    <Form form={passwordForm}>
      <FormInput label="旧密码" name="oldPassword" />
      <FormInput label="新密码" name="newPassword" />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            modifyPassword();
          }}
        >
          确认
        </Button>
        <Button
          danger
          onClick={() => {
            passwordForm.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};
