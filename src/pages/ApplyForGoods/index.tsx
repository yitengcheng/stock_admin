import React from 'react';
import useStateRef from 'react-usestateref';
import MyTable from '../../component/columnTable/MyTable';
import styles from './index.module.less';

export default (props: any) => {
  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')}>
      <MyTable
        name="物品申领列表"
        columns={[
          { title: '物品编号' },
          { title: '物品名称' },
          { title: '物品分类' },
          { title: '物品数量' },
          { title: '申请人' },
          { title: '申请时间' },
          { title: '备注' },
          { title: '审批状态' },
          { title: '操作' },
        ]}
      />
    </div>
  );
};
