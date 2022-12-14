import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Row, Space } from 'antd';
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
    outboundOrderForm.setFieldValue('orderNo', outboundOrder?.orderNo ?? `CK${dayjs().format('YYYYMMDDHHmmss')}`);
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
          <FormInput label="????????????" name="orderNo" disabled />
          {mode !== 2 && <FormDatePicker label="????????????" name="outboundTime" />}
          {mode !== 2 && <FormSelect label="????????????" name="outboundType" options={outboundTypeOption} />}
          {mode !== 2 && (
            <FormSelect
              label="?????????"
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
                <Row key={field.key}>
                  <Space align="baseline" size="large">
                    <FormSelect
                      label="??????"
                      name={[field.name, 'id']}
                      options={goodsOption}
                      onChange={(value) => {
                        onChangeGood(value);
                      }}
                      disabled={mode === 3}
                    />
                    <FormInput required={false} label="??????" name={[field.name, 'models']} disabled />
                    <FormInput required={false} label="??????" name={[field.name, 'unit']} disabled />
                    <FormInput required={false} label="??????" name={[field.name, 'price']} disabled />
                    <FormInput label="??????" name={[field.name, 'goodNum']} disabled={mode === 3} />
                    {mode !== 3 && (
                      <Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Form.Item>
                    )}
                  </Space>
                </Row>
              );
            })}
            {mode !== 3 && (
              <Form.Item>
                <Button type="dashed" onClick={add} icon={<PlusOutlined />}>
                  ????????????
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
      <FormTextArea label="??????" name="remark" required={false} />
      {mode !== 2 && (
        <FormSwitch label="???????????????" name="hasSynchronous" required={false} options={['??????', '?????????']} />
      )}
      <Space>
        <Button
          type="primary"
          onClick={() => {
            handleGood();
          }}
        >
          ??????
        </Button>
        <Button
          danger
          onClick={() => {
            outboundOrderForm.resetFields();
          }}
        >
          ??????
        </Button>
      </Space>
    </Form>
  );
};
