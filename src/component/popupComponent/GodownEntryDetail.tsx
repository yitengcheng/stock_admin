import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Row, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import { initSupplierOption, initStorageTypeOption, initEmployeeOption, initGoodOption } from '../../utils/initOption';
import FormDatePicker from '../form/FormDatePicker';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';
import FormSwitch from '../form/FormSwitch';
import FormTextArea from '../form/FormTextArea';

export default (props: any) => {
  const { closeModal, refresh } = props;
  const [godownEntryForm] = Form.useForm();
  const [storageTypeOption, setStorageTypeOption] = useStateRef([]);
  const [supplierOption, setSupplierOption] = useStateRef([]);
  const [employeeOption, setEmployeeOption] = useStateRef([]);
  const [goodsOption, setGoodsOption] = useStateRef([]);

  useEffect(async () => {
    setStorageTypeOption(await initStorageTypeOption());
    setSupplierOption(await initSupplierOption());
    setEmployeeOption(await initEmployeeOption());
    setGoodsOption(await initGoodOption());
  }, []);
  godownEntryForm.setFieldValue('orderNo', `RK${dayjs().format('YYYYMMDDHHmmss')}`);

  const handleGood = async () => {
    godownEntryForm.validateFields().then((values) => {
      post(apis.handleGodownEntry, values).then(() => {
        godownEntryForm.resetFields();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };

  return (
    <Form form={godownEntryForm}>
      <Row>
        <Space size="large">
          <FormInput label="单据编号" name="orderNo" disabled />
          <FormDatePicker label="入库时间" name="storageTime" />
          <FormSelect label="入库类型" name="storageType" options={storageTypeOption} />
          <FormSelect
            label="供应商"
            name="supplierId"
            options={supplierOption}
            required={false}
            onChange={(id) => {
              initGoodOption(id).then((res) => setGoodsOption(res));
            }}
          />
          <FormSelect label="经手人" name="handleUser" options={employeeOption} required={false} />
        </Space>
      </Row>

      <Form.List name="goodIds">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              const onChangeGood = (value) => {
                post(apis.good, { id: value }).then((res) => {
                  let resD = godownEntryForm.getFieldValue('goodIds');
                  resD[index] = {
                    id: res._id,
                    models: res.models,
                    unit: res.unit.name,
                    price: res.price,
                    goodNum: resD[index]?.goodNum,
                  };
                  godownEntryForm.setFieldValue('goodIds', resD);
                });
              };
              return (
                <Row key={field.key}>
                  <Space align="baseline" size="large">
                    <FormSelect
                      label="物品"
                      name={[field.name, 'id']}
                      options={goodsOption}
                      onChange={(value) => {
                        onChangeGood(value);
                      }}
                    />
                    <FormInput required={false} label="规格" name={[field.name, 'models']} disabled />
                    <FormInput required={false} label="单位" name={[field.name, 'unit']} disabled />
                    <FormInput required={false} label="单价" name={[field.name, 'price']} disabled />
                    <FormInput label="数量" name={[field.name, 'goodNum']} />
                    <Form.Item>
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Form.Item>
                  </Space>
                </Row>
              );
            })}
            <Form.Item>
              <Button type="dashed" onClick={add} icon={<PlusOutlined />}>
                添加物品
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <FormTextArea label="备注" name="remark" required={false} />
      <FormSwitch label="同步到明细" name="hasSynchronous" required={false} options={['同步', '不同步']} />
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
            godownEntryForm.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};
