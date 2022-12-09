import { Table, Typography } from 'antd';
import React from 'react';
import useStateRef from 'react-usestateref';
import FormDateRangePicker from '../../component/form/FormDateRangePicker';
import FormInput from '../../component/form/FormInput';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';
import apis from '../../apis';

const { Text } = Typography;

export default (props: any) => {
  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')}>
      <MyTable
        name="超限库存预警汇总表"
        url={apis.goodWarringTable}
        columns={[
          { title: '物品名称', dataIndex: 'name' },
          {
            title: '物品分类',
            dataIndex: 'classification',
            render: (obj) => <span>{obj?.name || '暂无'}</span>,
          },
          { title: '规格型号', dataIndex: 'models' },
          { title: '单位', dataIndex: 'unit', render: (obj) => <span>{obj?.name || '暂无'}</span> },
          { title: '单价', dataIndex: 'price' },
          { title: '库存数量', dataIndex: 'inventoryNumber' },
          { title: '库存上限', dataIndex: 'inventoryMax' },
          { title: '库存下限', dataIndex: 'inventoryMin' },
          { title: '备注', dataIndex: 'remark' },
        ]}
        summary={(pageData) => {
          let totalNumber = 0;
          let totalMax = 0;
          let totalMin = 0;
          let totalPrice = 0;
          pageData.forEach((data) => {
            totalNumber += data?.inventoryNumber;
            totalMax += data?.inventoryMax;
            totalMin += data?.inventoryMin;
            totalPrice += data?.price;
          });
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} align="center">
                总计
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} colSpan={4}></Table.Summary.Cell>
              <Table.Summary.Cell index={2} align="center">
                <Text type="success">{totalPrice}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} align="center">
                <Text type="warning">{totalNumber}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} align="center">
                <Text type="danger">{totalMax}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4} align="center">
                <Text>{totalMin}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} align="center"></Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};
