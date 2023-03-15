import { Button, Form, Space, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import FormDateRangePicker from '../../component/form/FormDateRangePicker';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';
import apis from '../../apis';
import { post } from '../../axios';

const { Text } = Typography;

export default () => {
  const [screenForm] = Form.useForm();
  const [tableData, setTableData] = useStateRef([]);
  const [params, setParams] = useStateRef({});

  useEffect(() => {
    initTableData();
  }, [params]);

  const initTableData = () => {
    post(apis.goodBalanceTable, params).then((res) => {
      setTableData(res?.list);
    });
  };
  const search = () => {
    screenForm.validateFields().then((values) => {
      setParams(values);
    });
  };

  return (
    <div className="mainContainer">
      <TableScreen label="收发结存汇总表">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormDateRangePicker label="时间范围" required={false} name="time" />
          <Button type="primary" onClick={search}>
            查询
          </Button>
        </Form>
      </TableScreen>
      <div className={styles.tableContainer}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '1vh' }}>
          <Space>
            <Button
              size={'small'}
              type={'primary'}
              onClick={() => {
                post(apis.downGoodBalanceTable, params).then((res) => {
                  window.open(`https://stock.qiantur.com/${res.url}`, '_blank');
                });
              }}
            >
              {'下载收发结存汇总表'}
            </Button>
          </Space>
        </div>
        <Table
          dataSource={tableData}
          bordered
          columns={[
            { title: '物品名称', dataIndex: 'goodName', align: 'center' },
            { title: '规格', dataIndex: 'goodModels', align: 'center' },
            { title: '单位', dataIndex: 'goodUnit', align: 'center' },
            // { title: '单价', dataIndex: 'goodPrice', align: 'center' },
            {
              title: '期初库存',
              align: 'center',
              dataIndex: 'startNumber',
              // children: [
              //   { title: '数量', align: 'center', dataIndex: 'startNumber' },
              //   // {
              //   //   title: '金额',
              //   //   align: 'center',
              //   //   render: (obj) => <span>{obj?.goodPrice * obj?.startNumber}</span>,
              //   // },
              // ],
            },
            {
              title: '本期入库',
              align: 'center',
              dataIndex: 'godownEntryNum',
              // children: [
              //   { title: '数量', align: 'center', dataIndex: 'godownEntryNum' },
              //   // {
              //   //   title: '金额',
              //   //   align: 'center',
              //   //   render: (obj) => <span>{obj?.goodPrice * obj?.godownEntryNum}</span>,
              //   // },
              // ],
            },
            {
              title: '本期出库',
              align: 'center',
              dataIndex: 'outboundNum',
              // children: [
              //   { title: '数量', align: 'center', dataIndex: 'outboundNum' },
              //   // {
              //   //   title: '金额',
              //   //   align: 'center',
              //   //   render: (obj) => <span>{obj?.goodPrice * obj?.outboundNum}</span>,
              //   // },
              // ],
            },
            {
              title: '期末库存',
              align: 'center',
              dataIndex: 'inventoryNumber',
              // children: [
              //   { title: '数量', align: 'center', dataIndex: 'inventoryNumber' },
              //   // {
              //   //   title: '金额',
              //   //   align: 'center',
              //   //   render: (obj) => <span>{obj?.goodPrice * obj?.inventoryNumber}</span>,
              //   // },
              // ],
            },
          ]}
          summary={(pageData) => {
            let totalStartNumber = 0;
            let totalGodownEntryNum = 0;
            let totalOutboundNum = 0;
            let totalInventoryNumber = 0;
            // let totalStartPrice = 0;
            // let totalGodownEntryPrice = 0;
            // let totalOutboundPrice = 0;
            // let totalInventoryPrice = 0;
            pageData.forEach((data) => {
              totalStartNumber += data?.startNumber;
              // totalStartPrice += data?.startNumber * data?.goodPrice;
              totalGodownEntryNum += data?.godownEntryNum;
              // totalGodownEntryPrice += data?.godownEntryNum * data?.goodPrice;
              totalOutboundNum += data?.outboundNum;
              // totalOutboundPrice += data?.outboundNum * data?.goodPrice;
              totalInventoryNumber += data?.inventoryNumber;
              // totalInventoryPrice += data?.inventoryNumber * data?.goodPrice;
            });
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} align="center">
                  总计
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={2} />
                <Table.Summary.Cell index={2} align="center">
                  <Text type="success">{totalStartNumber}</Text>
                </Table.Summary.Cell>
                {/* <Table.Summary.Cell index={3} align="center">
                  <Text type="success">{totalStartPrice}</Text>
                </Table.Summary.Cell> */}
                <Table.Summary.Cell index={3} align="center">
                  <Text type="warning">{totalGodownEntryNum}</Text>
                </Table.Summary.Cell>
                {/* <Table.Summary.Cell index={5} align="center">
                  <Text type="warning">{totalGodownEntryPrice}</Text>
                </Table.Summary.Cell> */}
                <Table.Summary.Cell index={4} align="center">
                  <Text type="danger">{totalOutboundNum}</Text>
                </Table.Summary.Cell>
                {/* <Table.Summary.Cell index={7} align="center">
                  <Text type="danger">{totalOutboundPrice}</Text>
                </Table.Summary.Cell> */}
                <Table.Summary.Cell index={5} align="center">
                  <Text>{totalInventoryNumber}</Text>
                </Table.Summary.Cell>
                {/* <Table.Summary.Cell index={9} align="center">
                  <Text>{totalInventoryPrice}</Text>
                </Table.Summary.Cell> */}
              </Table.Summary.Row>
            );
          }}
        />
      </div>
    </div>
  );
};
