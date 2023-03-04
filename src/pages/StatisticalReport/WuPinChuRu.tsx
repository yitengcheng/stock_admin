import { Form } from 'antd';
import React from 'react';
import FormDateRangePicker from '../../component/form/FormDateRangePicker';
import FormInput from '../../component/form/FormInput';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';

export default () => {
  const [screenForm] = Form.useForm();
  return (
    <div className="mainContainer">
      <TableScreen label="物品出入明细表">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormInput label="单据编号" required={false} name="receiptNumber" />
          <FormDateRangePicker label="出库时间" required={false} name="deliveryTime" />
          <FormSelect label="入库类型" required={false} name="outboundType" />
          <FormSelect label="供应商" required={false} name="recipientsDepartment" />
          <FormSelect label="经办人" required={false} name="recipient" />
        </Form>
      </TableScreen>
      <MyTable
        onAddBtn={() => {}}
        onDelBtn={() => {}}
        columns={[
          { title: '物品编号' },
          { title: '物品名称' },
          { title: '规格' },
          { title: '单位' },
          { title: '数量' },
          // { title: '单价' },
          // { title: '金额' },
          { title: '库存数量' },
          { title: '备注' },
        ]}
      />
    </div>
  );
};
