import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Descriptions, Form, Input, Row, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import {
  initSupplierOption,
  initStorageTypeOption,
  initEmployeeOption,
  initGoodOption,
  initOutboundTypeOption,
} from '../../utils/initOption';
import EditTable from '../EditTable';
import FormDatePicker from '../form/FormDatePicker';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';
import FormSwitch from '../form/FormSwitch';
import FormTextArea from '../form/FormTextArea';
import lodash from 'lodash';

export default (props: any) => {
  const { closeModal, refresh } = props;
  const [outboundOrderForm] = Form.useForm();
  const [outboundTypeOption, setOutboundTypeOption] = useStateRef([]);
  const [employeeOption, setEmployeeOption] = useStateRef([]);
  const [goodsOption, setGoodsOption] = useStateRef([]);

  useEffect(async () => {
    setOutboundTypeOption(await initOutboundTypeOption());
    setEmployeeOption(await initEmployeeOption());
    setGoodsOption(await initGoodOption());
  }, []);
  outboundOrderForm.setFieldValue('orderNo', `CK${dayjs().format('YYYYMMDDHHmmss')}`);

  const handleGood = async () => {
    outboundOrderForm.validateFields().then((values) => {
      post(apis.handleOutboundOrder, values).then(() => {
        outboundOrderForm.resetFields();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };

  return (
    <Form form={outboundOrderForm}>
      <Row>
        <Space size="large">
          <FormInput label="单据编号" name="orderNo" disabled={true} />
          <FormDatePicker label="出库时间" name="outboundTime" />
          <FormSelect label="出库类型" name="outboundType" options={outboundTypeOption} />
          <FormSelect label="领用人" name="receiveUser" options={employeeOption} required={false} />
        </Space>
      </Row>
      <FormTextArea label="备注" name="remark" required={false} />
      <FormSwitch label="同步到明细" name="hasSynchronous" required={false} options={['同步', '不同步']} />
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
                      label="物品"
                      name={[field.name, 'id']}
                      options={goodsOption}
                      onChange={(value) => {
                        onChangeGood(value);
                      }}
                    />
                    <FormInput required={false} label="规格" name={[field.name, 'models']} disabled={true} />
                    <FormInput required={false} label="单位" name={[field.name, 'unit']} disabled={true} />
                    <FormInput required={false} label="单价" name={[field.name, 'price']} disabled={true} />
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
