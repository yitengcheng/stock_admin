import { Button, Form, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import FormDateRangePicker from '../../component/form/FormDateRangePicker';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import { initSupplierOption } from '../../utils/initOption';
import apis from '../../apis';
import dayjs from 'dayjs';

const { Text } = Typography;

export default () => {
  const [screenForm] = Form.useForm();
  const [supplierOptions, setSupplierOptions] = useStateRef([]);
  const [params, setParams] = useStateRef({});

  useEffect(async () => {
    setSupplierOptions(await initSupplierOption());
  }, []);

  const search = () => {
    screenForm.validateFields().then((values) => {
      setParams(values);
    });
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')}>
      <TableScreen label="商家供货汇总表">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormDateRangePicker label="时间范围" required={false} name="storageTime" />
          <FormSelect label="供应商" required={false} name="supplierId" options={supplierOptions} />
          <Button type="primary" onClick={search}>
            查询
          </Button>
        </Form>
      </TableScreen>
      <MyTable
        url={apis.godownSupplierTable}
        params={params}
        columns={[
          {
            title: '日期',
            dataindex: 'godownEntryId',
            render: (obj) => (
              <span>
                {obj?.godownEntryId?.storageTime
                  ? dayjs(obj?.godownEntryId?.storageTime).format('YYYY年MM月DD日')
                  : '暂无'}
              </span>
            ),
          },
          { title: '物品名称', dataIndex: 'goodId', render: (obj) => <span>{obj?.name || '暂无'}</span> },
          { title: '规格', dataIndex: 'goodId', render: (obj) => <span>{obj?.models || '暂无'}</span> },
          { title: '单位', dataIndex: 'goodId', render: (obj) => <span>{obj?.unit?.name || '暂无'}</span> },
          { title: '数量', dataIndex: 'goodNum' },
          {
            title: '金额',
            dataIndex: 'goodNum',
            render: (obj, record) => <span>{obj ? obj * record?.goodId?.price : '暂无'}</span>,
          },
          {
            title: '物品分类',
            dataIndex: 'goodId',
            render: (obj) => <span>{obj?.classification?.name || '暂无'}</span>,
          },
          { title: '备注', dataIndex: 'remark' },
        ]}
        summary={(pageData) => {
          let totalGoodNum = 0;
          let totalPrice = 0;
          pageData.forEach((data) => {
            totalGoodNum += data?.goodNum;
            totalPrice += data?.goodNum * data?.goodId?.price;
          });
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} align="center">
                总计
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} colSpan={4} />
              <Table.Summary.Cell index={2} align="center">
                <Text type="success">{totalGoodNum}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} align="center">
                <Text type="warning">{totalPrice}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} colSpan={2} />
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};
