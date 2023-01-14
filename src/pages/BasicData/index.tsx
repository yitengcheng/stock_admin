import React from 'react';
import useStateRef from 'react-usestateref';
import ItemClassifyOption from '../../component/leftCommon/ItemClassifyOption';
import { randomKey } from '../../utils';
import GodownEntry from '../GodownEntry';
import IntegratedQuery from '../IntegratedQuery';
import OutboundOrder from '../OutboundOrder';
import styles from './index.module.less';
import _ from 'lodash';

export default (props: any) => {
  const [currentPage, setCurrentPage] = useStateRef(1);
  const [treeData, setTreeData] = useStateRef([
    { title: '出库单', key: randomKey(), page: 1 },
    { title: '入库单', key: randomKey(), page: 2 },
    { title: '出入库查询', key: randomKey(), page: 3 },
  ]);

  const selectPage = (select) => {
    const current = _.find(treeData, (o) => o.key === select);
    setCurrentPage(current?.page ?? 1);
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')} style={{ flexDirection: 'row' }}>
      <ItemClassifyOption title="基本资料" treeData={treeData} onClick={selectPage} />
      {currentPage === 1 && <OutboundOrder />}
      {currentPage === 2 && <GodownEntry />}
      {currentPage === 3 && <IntegratedQuery />}
    </div>
  );
};
