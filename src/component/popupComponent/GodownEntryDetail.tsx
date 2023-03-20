import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Descriptions, Form, Row, Space } from 'antd';
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
  godownEntryForm.setFieldValue('orderNo', `RK${dayjs().format('YYYYMMDDHHmmssSSS')}`);

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
                <Descriptions title="物品信息" bordered key={field.key} size="small">
                  <Descriptions.Item label="物品">
                    <FormSelect
                      placeholder="请选择物品"
                      name={[field.name, 'id']}
                      options={goodsOption}
                      onChange={(value) => {
                        onChangeGood(value);
                      }}
                      style={{ marginTop: '24px' }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="数量">
                    <FormInput placeholder="请输入数量" name={[field.name, 'goodNum']} />
                  </Descriptions.Item>
                  <Descriptions.Item label="规格">
                    <FormInput placeholder="请输入规格" required={false} name={[field.name, 'models']} disabled />
                  </Descriptions.Item>
                  <Descriptions.Item label="单位">
                    <FormInput placeholder="请输入单位" required={false} name={[field.name, 'unit']} disabled />
                  </Descriptions.Item>
                  <Descriptions.Item label="单价">
                    <FormInput placeholder="请输入单价" required={false} name={[field.name, 'price']} disabled />
                  </Descriptions.Item>

                  <Descriptions.Item>
                    <Form.Item style={{ marginTop: '24px' }}>
                      <Button
                        type="dashed"
                        danger
                        onClick={() => {
                          remove(field.name);
                        }}
                        icon={<MinusCircleOutlined />}
                      >
                        移除此项物品
                      </Button>
                    </Form.Item>
                  </Descriptions.Item>
                </Descriptions>
              );
            })}
            <Descriptions.Item>
              <Form.Item>
                <Button type="dashed" onClick={add} icon={<PlusOutlined />} style={{ marginTop: '1vh' }}>
                  添加物品
                </Button>
              </Form.Item>
            </Descriptions.Item>
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
