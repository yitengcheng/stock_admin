import { Button, Form, Space } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import FormRadioGroup from '../form/FormRadioGroup';
import FormSelect from '../form/FormSelect';

export default (props: any) => {
  const { closeModal, refresh } = props;
  const [departForm] = Form.useForm();
  const [departsOption, setDepartOption] = useStateRef([]);
  useEffect(() => {
    initDepartOption();
  }, []);
  const initDepartOption = async () => {
    try {
      const res = await post(apis.departments);
      let option = [];
      res.map((o) => {
        option.push({ label: o.departmentName, value: o._id });
      });
      setDepartOption(option);
    } catch (error) {
      console.log(error);
    }
  };
  const delDepartment = async () => {
    departForm.validateFields().then((values) => {
      post(apis.delDepartment, values).then(() => {
        departForm.resetFields();
        initDepartOption();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };
  return (
    <Form form={departForm}>
      <FormSelect label="待删除部门" name="id" options={departsOption} />
      <FormRadioGroup label="是否删除下属部门" name="flagAll" />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            delDepartment();
          }}
        >
          确认
        </Button>
        <Button
          danger
          onClick={() => {
            departForm.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};
