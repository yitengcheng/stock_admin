import { Button, Form, Space } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import { initClassificationOption, initSupplierOption, initUnitOption } from '../../utils/initOption';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';
import FormTextArea from '../form/FormTextArea';
import dayjs from 'dayjs';

export default (props: any) => {
  const { closeModal, refresh, good } = props;
  const [goodForm] = Form.useForm();
  const [unitOption, setUnitOption] = useStateRef([]);
  const [classificationOption, setClassificationOption] = useStateRef([]);
  const [supplierOption, setSupplierOption] = useStateRef([]);
  const [hasFixed, setHasFixed] = useStateRef('');
  const [fixedNo, setFixedNo] = useStateRef('');

  useEffect(async () => {
    setUnitOption(await initUnitOption());
    setClassificationOption(await initClassificationOption());
    setSupplierOption(await initSupplierOption());
  }, []);
  useEffect(() => {
    goodForm.setFieldsValue({
      name: good?.name,
      models: good?.models,
      unit: good?.unit?._id,
      classification: good?.classification?._id,
      price: good?.price,
      supplierId: good?.supplierId?._id,
      inventoryNumber: good?.inventoryNumber,
      inventoryMax: good?.inventoryMax,
      inventoryMin: good?.inventoryMin,
      remark: good?.remark,
      brand: good?.brand,
      hasFixed: good?.hasFixed,
      fixedNumber: good?.fixedNumber,
    });
    setHasFixed(good?.hasFixed);
    setFixedNo(good?.fixedNumber);
  }, [good]);

  const handleGood = async () => {
    goodForm.validateFields().then((values) => {
      post(apis.handleGood, { ...values, id: good?._id }).then(() => {
        goodForm.resetFields();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };

  return (
    <Form form={goodForm}>
      <FormInput label="物品名称" name="name" />
      <FormInput label="规格型号" name="models" />
      <FormSelect label="计量单位" name="unit" options={unitOption} />
      <FormSelect label="物品分类" name="classification" options={classificationOption} />
      <FormInput label="品牌" name="brand" />
      <FormSelect
        label="是否为固定资产"
        name="hasFixed"
        options={[
          { label: '是', value: true },
          { label: '否', value: false },
        ]}
        onChange={(value) => {
          setHasFixed(value);
          goodForm.setFieldValue('fixedNumber', fixedNo ?? `GD${dayjs().format('YYYYMMDDHHmmss')}`);
        }}
      />
      {hasFixed && <FormInput label="固定资产编码" name="fixedNumber" required={false} />}
      <FormInput label="单价" name="price" />
      <FormInput label="库存数量" name="inventoryNumber" />
      <FormInput label="库存上限" name="inventoryMax" required={false} />
      <FormInput label="库存下限" name="inventoryMin" required={false} />
      <FormSelect label="供应商" name="supplierId" options={supplierOption} required={false} />
      <FormTextArea label="备注" name="remark" required={false} />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            handleGood();
          }}
        >
          确认
        </Button>
        <Button
          danger
          onClick={() => {
            goodForm.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};
