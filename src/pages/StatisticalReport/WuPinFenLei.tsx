import { Button, Form, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import { initClassificationOption } from '../../utils/initOption';
import apis from '../../apis';
import { post } from '../../axios';

const { Text } = Typography;

export default () => {
  const [screenForm] = Form.useForm();
  const [params, setParams] = useStateRef({});
  const [classificationOption, setClassificationOption] = useStateRef([]);

  useEffect(async () => {
    setClassificationOption(await initClassificationOption());
  }, []);

  const search = () => {
    screenForm.validateFields().then((values) => {
      setParams(values);
    });
  };
  const downLoad = () => {
    post(apis.downGood, { params }).then((res) => {
      window.open(`https://stock.qiantur.com/${res.url}`, '_blank');
    });
  };

  return (
    <div className="mainContainer">
      <TableScreen label="物品分类汇总表">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormSelect label="物品分类" required={false} name="classification" options={classificationOption} />
          <Button type="primary" onClick={search}>
            查询
          </Button>
        </Form>
      </TableScreen>
      <MyTable
        url={apis.goodTable}
        params={params}
        buttonList={[{ text: '下载物品分类汇总表', click: downLoad }]}
        columns={[
          { title: '物品名称', dataIndex: 'name' },
          {
            title: '物品分类',
            dataIndex: 'classification',
            render: (obj) => <span>{obj?.name || '暂无'}</span>,
          },
          { title: '规格型号', dataIndex: 'models' },
          { title: '单位', dataIndex: 'unit', render: (obj) => <span>{obj?.name || '暂无'}</span> },
          // { title: '单价', dataIndex: 'price', width: 60 },
          { title: '库存数量', dataIndex: 'inventoryNumber' },
          { title: '库存上限', dataIndex: 'inventoryMax' },
          { title: '库存下限', dataIndex: 'inventoryMin' },
        ]}
        summary={(pageData) => {
          let totalNumber = 0;
          let totalMax = 0;
          let totalMin = 0;
          // let totalPrice = 0;
          pageData.forEach((data) => {
            totalNumber += data?.inventoryNumber;
            totalMax += data?.inventoryMax;
            totalMin += data?.inventoryMin;
            // totalPrice += data?.price;
          });
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} align="center">
                总计
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} colSpan={4} />
              {/* <Table.Summary.Cell index={2} align="center">
                <Text type="success">{totalPrice}</Text>
              </Table.Summary.Cell> */}
              <Table.Summary.Cell index={3} align="center">
                <Text type="warning">{totalNumber}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} align="center">
                <Text type="danger">{totalMax}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4} align="center">
                <Text>{totalMin}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};
