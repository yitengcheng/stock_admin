import { Button, Form, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import FormDateRangePicker from '../../component/form/FormDateRangePicker';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import { initDepartment } from '../../utils/initOption';
import apis from '../../apis';
import dayjs from 'dayjs';
import { post } from '../../axios';

const { Text } = Typography;

export default () => {
  const [screenForm] = Form.useForm();
  const [departmentOption, setDepartmentOption] = useStateRef([]);
  const [params, setParams] = useStateRef({});

  useEffect(async () => {
    setDepartmentOption(await initDepartment());
  }, []);

  const search = () => {
    screenForm.validateFields().then((values) => {
      setParams(values);
    });
  };
  const downLoad = () => {
    post(apis.downAccessTable, params).then((res) => {
      window.open(`https://stock.qiantur.com/${res.url}`, '_blank');
    });
  };

  return (
    <div className="mainContainer">
      <TableScreen label="部门领用汇总表">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormDateRangePicker label="日期范围" required={false} name="outboundTime" />
          <FormSelect label="部门" required={false} name="receiveDepartment" options={departmentOption} />
          <Button type="primary" onClick={search}>
            查询
          </Button>
        </Form>
      </TableScreen>
      <MyTable
        url={apis.accessTable}
        params={params}
        buttonList={[{ text: '下载部门领用汇总表', click: downLoad }]}
        columns={[
          {
            title: '日期',
            dataindex: 'outboundTime',
            render: (obj) => (
              <span>{obj?.outboundTime ? dayjs(obj?.outboundTime).format('YYYY年MM月DD日') : '暂无'}</span>
            ),
          },
          {
            title: '物品名称',
            dataIndex: 'goodId',
            render: (obj) => <span>{obj?.name || '暂无'}</span>,
          },
          {
            title: '规格型号',
            dataIndex: 'goodId',
            render: (obj) => <span>{obj?.models || '暂无'}</span>,
          },
          {
            title: '单位',
            dataIndex: 'goodId',
            render: (obj) => <span>{obj?.unit?.name || '暂无'}</span>,
          },
          { title: '数量', dataIndex: 'goodNum' },
          // {
          //   title: '金额',
          //   dataIndex: 'goodNum',
          //   render: (obj, record) => <span>{obj ? obj * record?.goodId?.price : '暂无'}</span>,
          // },
          {
            title: '物品分类',
            dataIndex: 'goodId',
            render: (obj) => <span>{obj?.classification?.name || '暂无'}</span>,
          },

          { title: '备注', dataIndex: 'remark' },
        ]}
        summary={(pageData) => {
          let totalGoodNum = 0;
          // let totalPrice = 0;
          pageData.forEach((data) => {
            totalGoodNum += data?.goodNum;
            // totalPrice += data?.goodNum * data?.goodId?.price;
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
              </Table.Summary.Cell> */}
              <Table.Summary.Cell index={3} colSpan={2} />
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};
