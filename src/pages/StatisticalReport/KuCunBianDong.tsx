import { Button, Form, Space, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import FormDateRangePicker from '../../component/form/FormDateRangePicker';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';
import apis from '../../apis';
import { post } from '../../axios';
import dayjs from 'dayjs';

const { Text } = Typography;

export default () => {
  const [screenForm] = Form.useForm();
  const [tableData, setTableData] = useStateRef([]);
  const [params, setParams] = useStateRef({});

  useEffect(() => {
    initTableData();
  }, [params]);

  const initTableData = () => {
    post(apis.goodChangeTable, params).then((res) => {
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
      <TableScreen label="库存变动汇总表">
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
                post(apis.downGoodChangeTable, params).then((res) => {
                  window.open(`https://stock.qiantur.com/${res.url}`, '_blank');
                });
              }}
            >
              {'下载库存变动汇总表'}
            </Button>
          </Space>
        </div>
        <Table
          dataSource={tableData}
          bordered
          columns={[
            {
              title: '发生日期',
              dataIndex: 'date',
              align: 'center',
              render: (obj) => <span>{obj ? dayjs(obj).format('YYYY年MM月DD日') : '暂无'}</span>,
            },
            {
              title: '单据编号',
              dataIndex: 'orderNo',
              align: 'center',
              render: (obj) => <span>{obj ?? '暂无'}</span>,
            },
            { title: '物品名称', dataIndex: 'goodName', align: 'center' },
            { title: '规格', dataIndex: 'goodModels', align: 'center' },
            { title: '单位', dataIndex: 'goodUnit', align: 'center' },
            { title: '数量', dataIndex: 'goodNum', align: 'center' },
            // { title: '单价', dataIndex: 'goodPrice', align: 'center' },
            // { title: '金额', dataIndex: 'goodAmount', align: 'center' },
          ]}
          summary={(pageData) => {
            let totalGoodNum = 0;
            // let totalPrice = 0;
            // let totalAmount = 0;
            pageData.forEach((data) => {
              totalGoodNum += data?.goodNum;
              // totalPrice += data?.goodPrice;
              // totalAmount += data?.goodNum * data?.goodPrice;
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
                {/* <Table.Summary.Cell index={3} align="center">
                  <Text type="warning">{totalPrice}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="center">
                  <Text type="warning">{totalAmount}</Text>
                </Table.Summary.Cell> */}
              </Table.Summary.Row>
            );
          }}
        />
      </div>
    </div>
  );
};
