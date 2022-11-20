import { Form, Row, Space } from 'antd';
import React from 'react';
import useStateRef from 'react-usestateref';
import FormDateRangePicker from '../../component/form/FormDateRangePicker';
import FormInput from '../../component/form/FormInput';
import FormRadioGroup from '../../component/form/FormRadioGroup';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';

export default (props: any) => {
  const [screenForm] = Form.useForm();
  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')}>
      <TableScreen label="出入库查询">
        <Form form={screenForm} scrollToFirstError labelWrap>
          <Row>
            <FormRadioGroup
              label="单据类型"
              required={false}
              name="itemType"
              options={[
                { label: '出库查询', value: 1 },
                { label: '入库查询', value: 2 },
              ]}
            />
          </Row>
          <Row>
            <Space>
              <FormSelect label="登账状态" required={false} name="bookkeepingState" />
              <FormInput label="单据编号" required={false} name="receiptNumber" />
              <FormInput label="物品名称" required={false} name="itemName" />
              <FormSelect label="领用人" required={false} name="recipient" />
              <FormDateRangePicker label="出库时间" required={false} name="deliveryTime" />
            </Space>
          </Row>
          <Row>
            <Space>
              <FormSelect label="领用部门" required={false} name="recipientsDepartment" />
              <FormInput label="物品编号" required={false} name="itemCode" />
              <FormInput label="规格型号" required={false} name="specifications" />
              <FormSelect label="制单人" required={false} name="makingPeople" />
              <FormSelect label="出库类型" required={false} name="outboundType" />
            </Space>
          </Row>
        </Form>
      </TableScreen>
      <MyTable
        onAddBtn={() => {}}
        onDelBtn={() => {}}
        columns={[
          { title: '登账状态' },
          { title: '单据编号' },
          { title: '出库时间' },
          { title: '出库类型' },
          { title: '领用部门' },
          { title: '领用人' },
          { title: '制单人' },
          { title: '备注' },
        ]}
      />
    </div>
  );
};
