import { Button, Form, Space } from 'antd';
import React, { useEffect } from 'react';
import apis from '../../apis';
import { post } from '../../axios';
import FormInput from '../form/FormInput';
import FormTextArea from '../form/FormTextArea';

export default (props: any) => {
  const { closeModal, refresh, supplier } = props;
  const [supplierForm] = Form.useForm();

  useEffect(() => {
    supplierForm.setFieldsValue({
      name: supplier?.name,
      headerUser: supplier?.headerUser,
      phone: supplier?.phone,
      wechat: supplier?.wechat,
      email: supplier?.email,
      address: supplier?.address,
      remark: supplier?.remark,
    });
  }, [supplier]);

  const handleSupplier = async () => {
    supplierForm.validateFields().then((values) => {
      post(apis.handleSuppliers, { ...values, id: supplier?._id }).then(() => {
        supplierForm.resetFields();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };

  return (
    <Form form={supplierForm}>
      <FormInput label="供应商名" name="name" />
      <FormInput label="负责人姓名" name="headerUser" />
      <FormInput label="联系方式" name="phone" />
      <FormInput label="微信" name="wechat" required={false} />
      <FormInput label="电子邮箱" name="email" required={false} />
      <FormInput label="地址" name="address" required={false} />
      <FormTextArea label="备注" name="remark" required={false} />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            handleSupplier();
          }}
        >
          确认
        </Button>
        <Button
          danger
          onClick={() => {
            supplierForm.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};
