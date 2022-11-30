import React from 'react';
import { randomKey } from '../../utils';
import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';

export default () => {
  const navigator = useNavigate();
  const menus = [
    { color: '#E2EBFC', icon: '/src/assets/images/outbound.png', title: '出库单', path: 'outboundOrder' },
    { color: '#E6F7E9', icon: '/src/assets/images/outboundRegister.png', title: '出库登记' },
    { color: '#E2EBFC', icon: '/src/assets/images/option.png', title: '部门管理', path: 'departmentManagement' },
    { color: '#FFF5E6', icon: '/src/assets/images/analyze.png', title: '统计报表' },
    { color: '#DFF8FB', icon: '/src/assets/images/itemClassify.png', title: '选项设置', path: 'option' },
    { color: '#E6F7E9', icon: '/src/assets/images/supplier.png', title: '供应商', path: 'supplier' },
    { color: '#FFECEC', icon: '/src/assets/images/recipient.png', title: '员工管理', path: 'employee' },
    { color: '#E2EBFC', icon: '/src/assets/images/putinStorage.png', title: '入库单', path: 'godownEntry' },
    { color: '#E2EBFC', icon: '/src/assets/images/list.png', title: '库存查询', path: 'inventory' },
    { color: '#E6F7E9', icon: '/src/assets/images/quota.png', title: '部门定额', path: 'branchQuota' },
  ];
  const pageJump = (path) => {
    navigator(path);
  };
  return (
    <div className={styles.menuContairner}>
      {menus.map((menu) => (
        <div
          className={styles.menuBox}
          key={randomKey()}
          onClick={() => {
            pageJump(menu?.path);
          }}
        >
          <div className={styles.menuImgBox} style={{ backgroundColor: menu.color }}>
            <img src={menu.icon} style={{ width: '1.5vw', height: '1.5vw' }} />
          </div>
          <div>{menu.title}</div>
        </div>
      ))}
    </div>
  );
};
