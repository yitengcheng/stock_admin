import React from 'react';
import useStateRef from 'react-usestateref';
import ItemClassifyOption from '../../component/leftCommon/ItemClassifyOption';
import { randomKey } from '../../utils';
import styles from './index.module.less';
import _ from 'lodash';
import BuMenLingYong from '../StatisticalReport/BuMenLingYong';
import ChaoXianKuCunYuJing from '../StatisticalReport/ChaoXianKuCunYuJing';
import KuCunBianDong from '../StatisticalReport/KuCunBianDong';
import RenYuanLingYong from '../StatisticalReport/RenYuanLingYong';
import ShangJiaGongHuo from '../StatisticalReport/ShangJiaGongHuo';
import ShouFaJieCun from '../StatisticalReport/ShouFaJieCun';
import WuPinFenLei from '../StatisticalReport/WuPinFenLei';

export default (props: any) => {
  const [currentPage, setCurrentPage] = useStateRef(1);
  const [treeData, setTreeData] = useStateRef([
    { title: '部门领用汇总表', key: randomKey(), page: 1 },
    { title: '超限库存预警表', key: randomKey(), page: 2 },
    { title: '库存变动汇总表', key: randomKey(), page: 3 },
    { title: '人员领用汇总表', key: randomKey(), page: 4 },
    { title: '商家供货汇总表', key: randomKey(), page: 5 },
    { title: '收发结存汇总表', key: randomKey(), page: 6 },
    { title: '物品分类汇总表', key: randomKey(), page: 7 },
  ]);

  const selectPage = (select) => {
    const current = _.find(treeData, (o) => o.key === select);
    setCurrentPage(current?.page ?? 1);
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')} style={{ flexDirection: 'row' }}>
      <ItemClassifyOption title="物品申领" treeData={treeData} onClick={selectPage} />
      {currentPage === 1 && <BuMenLingYong />}
      {currentPage === 2 && <ChaoXianKuCunYuJing />}
      {currentPage === 3 && <KuCunBianDong />}
      {currentPage === 4 && <RenYuanLingYong />}
      {currentPage === 5 && <ShangJiaGongHuo />}
      {currentPage === 6 && <ShouFaJieCun />}
      {currentPage === 7 && <WuPinFenLei />}
    </div>
  );
};
