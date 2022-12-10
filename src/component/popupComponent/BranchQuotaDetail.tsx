import { Button, Form, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import { initDepartment, initGoodOption } from '../../utils/initOption';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';

export default (props: any) => {
  const { closeModal, refresh, branchQuta } = props;
  const [branchQutaForm] = Form.useForm();
  const [departmentOption, setDepartmentOption] = useStateRef([]);
  const [goodOption, setGoodOption] = useStateRef([]);

  useEffect(async () => {
    setDepartmentOption(await initDepartment());
    setGoodOption(await initGoodOption());
  }, []);
  useEffect(() => {
    branchQutaForm.setFieldsValue({
      ...branchQuta,
      departmentId: branchQuta?.departmentId?._id,
      goodId: branchQuta?.goodId?._id,
    });
  }, [branchQuta]);

  const handleBranchQutas = async () => {
    branchQutaForm.validateFields().then((values) => {
      post(apis.handleBranchQutas, { ...values, id: branchQuta?._id }).then(() => {
        branchQutaForm.resetFields();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };

  return (
    <Form form={branchQutaForm}>
      <Row>
        <Space size="large">
          <FormSelect label="部门" name="departmentId" options={departmentOption} />
          <FormSelect label="物品" name="goodId" options={goodOption} />
        </Space>
      </Row>

      <Row justify="space-around">
        <FormInput label="一月定额" name="jan" required={false} />
        <FormInput label="二月定额" name="feb" required={false} />
        <FormInput label="三月定额" name="mar" required={false} />
      </Row>
      <Row justify="space-around">
        <FormInput label="四月定额" name="apr" required={false} />
        <FormInput label="五月定额" name="may" required={false} />
        <FormInput label="六月定额" name="jun" required={false} />
      </Row>
      <Row justify="space-around">
        <FormInput label="七月定额" name="jul" required={false} />
        <FormInput label="八月定额" name="aug" required={false} />
        <FormInput label="九月定额" name="sep" required={false} />
      </Row>
      <Row justify="space-around">
        <FormInput label="十月定额" name="oct" required={false} />
        <FormInput label="十一月定额" name="nov" required={false} />
        <FormInput label="十二月定额" name="dec" required={false} />
      </Row>

      <Space>
        <Button
          type="primary"
          onClick={() => {
            handleBranchQutas();
          }}
        >
          确认
        </Button>
        <Button
          danger
          onClick={() => {
            branchQutaForm.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};
