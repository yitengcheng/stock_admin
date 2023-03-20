import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Descriptions, Form, Row, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import { initEmployeeOption, initGoodOption, initOutboundTypeOption } from '../../utils/initOption';
import FormDatePicker from '../form/FormDatePicker';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';
import FormSwitch from '../form/FormSwitch';
import FormTextArea from '../form/FormTextArea';

export default (props: any) => {
  const { closeModal, refresh, mode, outboundOrder } = props;
  const [outboundOrderForm] = Form.useForm();
  const [outboundTypeOption, setOutboundTypeOption] = useStateRef([]);
  const [employeeOption, setEmployeeOption] = useStateRef([]);
  const [goodsOption, setGoodsOption] = useStateRef([]);

  useEffect(async () => {
    setOutboundTypeOption(await initOutboundTypeOption());
    setEmployeeOption(await initEmployeeOption());
    setGoodsOption(await initGoodOption());
    initFormData();
  }, [outboundOrder]);

  const handleGood = async () => {
    outboundOrderForm.validateFields().then((values) => {
      let url = '';
      switch (mode) {
        case 1:
          url = apis.handleOutboundOrder;
          break;
        case 2:
          url = apis.applyOutboundOrder;
          break;
        case 3:
          url = apis.stockRemovalOrder;
          break;
        default:
          break;
      }
      post(url, { id: outboundOrder?._id, ...values }).then(() => {
        outboundOrderForm.resetFields();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };
  const initFormData = () => {
    let goodIds = [];
    outboundOrderForm.setFieldValue('orderNo', outboundOrder?.orderNo ?? `CK${dayjs().format('YYYYMMDDHHmmssSSS')}`);
    outboundOrderForm.setFieldValue('outboundTime', outboundOrder?.outboundTime);
    outboundOrderForm.setFieldValue('outboundType', outboundOrder?.outboundType);
    outboundOrderForm.setFieldValue('receiveUser', outboundOrder?.receiveUser?._id);
    outboundOrderForm.setFieldValue('remark', outboundOrder?.remark);
    outboundOrder?.outboundItems.map((item) => {
      const { goodId, goodNum } = item;
      goodIds.push({
        id: goodId?._id,
        models: goodId?.models,
        unit: goodId?.unit?.name,
        price: goodId?.price,
        goodNum,
      });
    });
    outboundOrderForm.setFieldValue('goodIds', goodIds);
  };

  return (
    <Form form={outboundOrderForm}>
      <Row>
        <Space size="large">
          <FormInput label="单据编号" name="orderNo" disabled />
          {mode !== 2 && <FormDatePicker label="出库时间" name="outboundTime" />}
          {mode !== 2 && <FormSelect label="出库类型" name="outboundType" options={outboundTypeOption} />}
          {mode !== 2 && (
            <FormSelect
              label="领用人"
              name="receiveUser"
              options={employeeOption}
              required={false}
              disabled={mode === 3}
            />
          )}
        </Space>
      </Row>

      <Form.List name="goodIds">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              const onChangeGood = (value) => {
                post(apis.good, { id: value }).then((res) => {
                  let resD = outboundOrderForm.getFieldValue('goodIds');
                  resD[index] = {
                    id: res._id,
                    models: res.models,
                    unit: res.unit.name,
                    price: res.price,
                    goodNum: resD[index]?.goodNum,
                  };
                  outboundOrderForm.setFieldValue('goodIds', resD);
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
                      disabled={mode === 3}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="数量">
                    <FormInput
                      placeholder="请输入数量"
                      name={[field.name, 'goodNum']}
                      disabled={mode === 3}
                      style={{ marginTop: '24px' }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="规格">
                    <FormInput
                      placeholder="请输入规格"
                      required={false}
                      name={[field.name, 'models']}
                      disabled
                      style={{ marginTop: '24px' }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="单位">
                    <FormInput
                      placeholder="请输入单位"
                      required={false}
                      name={[field.name, 'unit']}
                      disabled
                      style={{ marginTop: '24px' }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="单价">
                    <FormInput
                      placeholder="请输入单价"
                      required={false}
                      name={[field.name, 'price']}
                      disabled
                      style={{ marginTop: '24px' }}
                    />
                  </Descriptions.Item>

                  {mode !== 3 && (
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
                  )}
                </Descriptions>
              );
            })}
            {mode !== 3 && (
              <Descriptions.Item>
                <Form.Item>
                  <Button type="dashed" onClick={add} icon={<PlusOutlined />} style={{ marginTop: '1vh' }}>
                    添加物品
                  </Button>
                </Form.Item>
              </Descriptions.Item>
            )}
          </>
        )}
      </Form.List>
      <FormTextArea label="备注" name="remark" required={false} />
      {mode !== 2 && (
        <FormSwitch label="同步到明细" name="hasSynchronous" required={false} options={['同步', '不同步']} />
      )}
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
            outboundOrderForm.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};
