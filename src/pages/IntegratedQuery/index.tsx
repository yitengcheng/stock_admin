import { Button, Form, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import FormDateRangePicker from '../../component/form/FormDateRangePicker';
import FormInput from '../../component/form/FormInput';
import FormRadioGroup from '../../component/form/FormRadioGroup';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import lodash from 'lodash';
import dayjs from 'dayjs';
import {
  initDepartment,
  initEmployeeOption,
  initOutboundTypeOption,
  initStorageTypeOption,
  initSupplierOption,
} from '../../utils/initOption';
import apis from '../../apis';
import { showOption } from '../../utils';
import { GODOWNENTRY_TYPE, OUTBOUNDORDER_TYPE } from '../../constant';

export default () => {
  const [screenForm] = Form.useForm();
  const [itemType, setItemType] = useStateRef('');
  const [storageTypeOption, setStorageTypeOption] = useStateRef([]);
  const [supplierOption, setSupplierOption] = useStateRef([]);
  const [employeeOption, setEmployeeOption] = useStateRef([]);
  const [outboundTypeOption, setOutboundTypeOption] = useStateRef([]);
  const [departmentOption, setDepartmentOption] = useStateRef([]);
  const [url, setUrl, urlRef] = useStateRef('');
  const [params, setParams] = useStateRef({});
  const [columns, setColumns] = useStateRef([]);

  useEffect(async () => {
    setStorageTypeOption(await initStorageTypeOption());
    setSupplierOption(await initSupplierOption());
    setEmployeeOption(await initEmployeeOption());
    setOutboundTypeOption(await initOutboundTypeOption());
    setDepartmentOption(await initDepartment());
  }, []);

  const onChangeType = (value) => {
    if (value === 1) {
      setUrl(apis.outboundOrderTable);
      setColumns([
        { title: '出库单号', dataIndex: 'orderNo' },
        {
          title: '物品名称',
          dataIndex: 'outboundItems',
          render: (obj) => <span>{lodash.map(lodash.map(obj, 'goodId'), 'name').join(',') || '暂无'}</span>,
        },
        { title: '数量合计', dataIndex: 'numberTotal' },
        { title: '金额合计', dataIndex: 'amountTotal' },
        {
          title: '出库类型',
          dataIndex: 'outboundType',
          render: (obj) => <span>{obj?.name || '暂无'}</span>,
        },
        {
          title: '出库时间',
          dataindex: 'outboundTime',
          render: (obj) => (
            <span>{obj?.outboundTime ? dayjs(obj?.outboundTime).format('YYYY年MM月DD日') : '暂无'}</span>
          ),
        },
        {
          title: '状态',
          dataindex: 'status',
          render: (obj) => <span>{obj?.status ? showOption(OUTBOUNDORDER_TYPE, obj?.status) : '暂无'}</span>,
        },
        { title: '备注', dataIndex: 'remark' },
      ]);
    }
    if (value === 2) {
      setUrl(apis.godownEntryTable);
      setColumns([
        { title: '入库单号', dataIndex: 'orderNo' },
        {
          title: '物品名称',
          dataIndex: 'godownEntryIds',
          render: (obj) => <span>{lodash.map(lodash.map(obj, 'goodId'), 'name').join(',') || '暂无'}</span>,
        },
        { title: '数量合计', dataIndex: 'numberTotal' },
        { title: '金额合计', dataIndex: 'amountTotal' },
        {
          title: '入库类型',
          dataIndex: 'storageType',
          render: (obj) => <span>{obj?.name || '暂无'}</span>,
        },
        {
          title: '入库时间',
          dataindex: 'storageTime',
          render: (obj) => <span>{obj?.storageTime ? dayjs(obj?.storageTime).format('YYYY年MM月DD日') : '暂无'}</span>,
        },
        {
          title: '状态',
          dataindex: 'status',
          render: (obj) => <span>{obj?.status ? showOption(GODOWNENTRY_TYPE, obj?.status) : '暂无'}</span>,
        },
        { title: '备注', dataIndex: 'remark' },
      ]);
    }
    setItemType(value);
  };
  const godownEntrySearch = () => {
    return (
      <Row>
        <Space size="large">
          <FormInput label="单据编号" required={false} name="orderNo" />
          <FormDateRangePicker label="入库时间" required={false} name="storageTime" />
          <FormSelect label="入库类型" required={false} name="storageType" options={storageTypeOption} />
          <FormSelect label="供应商" required={false} name="supplierId" options={supplierOption} />
          <FormSelect label="经手人" required={false} name="handleUser" options={employeeOption} />
        </Space>
      </Row>
    );
  };
  const outboundOrderSearch = () => {
    return (
      <Row>
        <Space size="large">
          <FormInput label="单据编号" required={false} name="orderNo" />
          <FormDateRangePicker label="出库时间" required={false} name="outboundTime" />
          <FormSelect label="出库类型" required={false} name="outboundType" options={outboundTypeOption} />
          <FormSelect label="领用部门" required={false} name="receiveDepartment" options={departmentOption} />
          <FormSelect label="领用人" required={false} name="receiveUser" options={employeeOption} />
        </Space>
      </Row>
    );
  };
  const search = () => {
    screenForm.validateFields().then((values) => {
      setParams(values);
    });
  };

  return (
    <div className="mainContainer">
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
              onChange={({ target }) => onChangeType(target.value)}
            />
          </Row>
          {itemType === 2 && godownEntrySearch()}
          {itemType === 1 && outboundOrderSearch()}
          {itemType && (
            <Button type="primary" onClick={search}>
              查询
            </Button>
          )}
        </Form>
      </TableScreen>
      <MyTable url={urlRef.current} params={params} columns={columns} width={1800} />
    </div>
  );
};
