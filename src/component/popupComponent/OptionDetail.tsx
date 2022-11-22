import { Button, Form, Space } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import { OPTION_TYPE } from '../../constant';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';
import FormTextArea from '../form/FormTextArea';

export default (props: any) => {
  const { closeModal, refresh, option } = props;
  const [optionForm] = Form.useForm();

  useEffect(() => {
    optionForm.setFieldsValue({
      name: option?.name,
      type: option?.type,
      remark: option?.remark,
    });
  }, [option]);

  const handleSupplier = async () => {
    optionForm.validateFields().then((values) => {
      post(apis.handleOption, { ...values, id: option._id }).then(() => {
        optionForm.resetFields();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };

  return (
    <Form form={optionForm}>
      <FormSelect label="选项类型" name="type" options={OPTION_TYPE} />
      <FormInput label="选项名" name="name" />
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
            optionForm.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};
