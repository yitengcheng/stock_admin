import { Button, Form, Space } from 'antd';
import React, { useEffect } from 'react';
import apis from '../../apis';
import { post } from '../../axios';
import { OPTION_TYPE } from '../../constant';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';
import FormTextArea from '../form/FormTextArea';
import FormSwitch from '../form/FormSwitch';
import useStateRef from 'react-usestateref';

export default (props: any) => {
  const { closeModal, refresh, option } = props;
  const [optionForm] = Form.useForm();
  const [type, setType, typeRef] = useStateRef('');

  useEffect(() => {
    optionForm.setFieldsValue({
      name: option?.name,
      type: option?.type,
      remark: option?.remark,
      hasShare: option?.hasShare,
    });
    setType(option?.type);
  }, [option]);

  const handleSupplier = async () => {
    optionForm.validateFields().then((values) => {
      post(apis.handleOption, { ...values, id: option?._id }).then(() => {
        optionForm.resetFields();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };

  const changeType = (value) => {
    setType(value);
  };

  return (
    <Form form={optionForm}>
      <FormSelect
        label="选项类型"
        name="type"
        options={OPTION_TYPE}
        onChange={(value) => {
          changeType(value);
        }}
      />
      <FormInput label="选项名" name="name" />
      <FormTextArea label="备注" name="remark" required={false} />
      {typeRef.current === 4 && <FormSwitch label="是否共享" name="hasShare" required={false} />}
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
