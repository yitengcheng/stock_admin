import { Button, Form } from 'antd';
import React from 'react';
import apis from '../../apis';
import { post } from '../../axios';
import FormInput from '../../component/form/FormInput';
import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';
import { setStorage } from '../../localStorage';
import { DEFAULT_APPNAME } from '../../constant';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export default () => {
  const [loginForm] = Form.useForm();
  const navigate = useNavigate();
  const login = () => {
    loginForm
      .validateFields()
      .then((values) => {
        post(apis.login, { platform: 'stock', ...values }).then((res) => {
          setStorage('token', res.token);
          setStorage('userInfo', res.userInfo);
          navigate('/home', { replace: true });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginText}>{`${DEFAULT_APPNAME}`}</div>
      <div className={styles.form_box}>
        <div className={styles['form_title']}>用户登录</div>
        <Form form={loginForm}>
          <FormInput prefix={<UserOutlined />} placeholder="请输入手机号" name="username" />
          <FormInput prefix={<LockOutlined />} placeholder="请输入密码" name="password" type="password" />
        </Form>
        <Button type="primary" onClick={login} className={styles.loginBtn}>
          登录
        </Button>
      </div>
    </div>
  );
};
