import { Button, Form, Space } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import { initDepartment } from '../../utils/initOption';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';
import FormTextArea from '../form/FormTextArea';

export default (props: any) => {
  const { closeModal, refresh, departmentId, employee } = props;
  const [employeeForm] = Form.useForm();
  const [departsOption, setDepartOption] = useStateRef([]);
  useEffect(async () => {
    setDepartOption(await initDepartment());
  }, []);
  useEffect(() => {
    employeeForm.setFieldsValue({
      name: employee?.name,
      account: employee?.account,
      phone: employee?.phone,
      type: employee?.type,
      remark: employee?.remark,
      departmentId: departmentId ?? employee?.departmentId?._id,
    });
  }, [employee, departmentId]);

  const handleEmployee = async () => {
    employeeForm.validateFields().then((values) => {
      post(apis.handleEmployee, { ...values, id: employee?._id }).then(() => {
        employeeForm.resetFields();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };

  return (
    <Form form={employeeForm}>
      <FormSelect label="所属部门" name="departmentId" options={departsOption} />
      <FormInput label="姓名" name="name" />
      <FormInput label="登录账号" name="account" />
      <FormInput label="联系电话" name="phone" />
      <FormInput label="登录密码" name="password" />
      <FormSelect
        label="员工类型"
        name="type"
        options={[
          { label: '管理者', value: 1 },
          { label: '普通员工', value: 2 },
          { label: '普通审核员', value: 3 },
        ]}
      />
      <FormTextArea label="备注" name="remark" required={false} />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            handleEmployee();
          }}
        >
          确认
        </Button>
        <Button
          danger
          onClick={() => {
            employeeForm.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};
