import { Button, Form, Result, Space } from "antd";
import React, { useEffect } from "react";
import useStateRef from "react-usestateref";
import apis from "../../apis";
import { post } from "../../axios";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import styles from "./index.module.less";

export default (props: any) => {
  const { closeModal, refresh, parentId, departmentName, departmentId } = props;
  const [departForm] = Form.useForm();
  const [departsOption, setDepartOption] = useStateRef([]);
  useEffect(() => {
    initDepartOption();
  }, []);
  useEffect(() => {
    departForm && departForm.setFieldsValue({ parentId, departmentName });
  }, [parentId, departmentName]);
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
  const handleDepartment = async () => {
    departForm.validateFields().then((values) => {
      post(apis.handleDepartment, { id: departmentId, ...values }).then(() => {
        departForm.resetFields();
        initDepartOption();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };
  return (
    <Form form={departForm}>
      <FormSelect label="上级部门" name="parentId" required={false} options={departsOption} />
      <FormInput label="部门名称" name="departmentName" />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            handleDepartment();
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
