import React from 'react';
import useStateRef from 'react-usestateref';
import ItemClassifyOption from '../../component/leftCommon/ItemClassifyOption';
import { randomKey } from '../../utils';
import styles from './index.module.less';
import _ from 'lodash';
import CheckOutboundOrder from '../CheckOutboundOrder';
import CheckOutboundOrderHistory from '../CheckOutboundOrderHistory';
import ApplyForGoods from '../ApplyForGoods';
import ApplyForGoodsHistory from '../ApplyForGoodsHistory';
import { getStorage } from '../../localStorage';

export default (props: any) => {
  const userInfo = getStorage('userInfo');
  const [currentPage, setCurrentPage] = useStateRef(1);
  const [treeData, setTreeData] = useStateRef([
    { title: '物品申领', key: 11, page: 1 },
    { title: '申领历史', key: 22, page: 2 },
    { title: '审批列表', key: 33, page: 3 },
    { title: '审批历史', key: 44, page: 4 },
  ]);
  const [commonTreeData, setCommonTreeData] = useStateRef([
    { title: '物品申领', key: 11, page: 1 },
    { title: '申领历史', key: 22, page: 2 },
  ]);

  const selectPage = (select) => {
    const current = _.find(treeData, (o) => o.key === select);
    setCurrentPage(current?.page ?? 1);
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')} style={{ flexDirection: 'row' }}>
      <ItemClassifyOption
        title="物品申领"
        treeData={userInfo?.type === 2 ? commonTreeData : treeData}
        onClick={selectPage}
      />
      {currentPage === 1 && <ApplyForGoods />}
      {currentPage === 2 && <ApplyForGoodsHistory />}
      {currentPage === 3 && <CheckOutboundOrder />}
      {currentPage === 4 && <CheckOutboundOrderHistory />}
    </div>
  );
};
