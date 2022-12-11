import React from 'react';
import { randomKey } from '../../utils';
import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';
import outbound from '../../assets/images/outbound.png';
import outboundRegister from '../../assets/images/outboundRegister.png';
import option from '../../assets/images/option.png';
import analyze from '../../assets/images/analyze.png';
import itemClassify from '../../assets/images/itemClassify.png';
import supplier from '../../assets/images/supplier.png';
import recipient from '../../assets/images/recipient.png';
import putinStorage from '../../assets/images/putinStorage.png';
import list from '../../assets/images/list.png';
import quota from '../../assets/images/quota.png';

export default () => {
  const navigator = useNavigate();
  const menus = [
    { color: '#E2EBFC', icon: outbound, title: '出库单', path: 'outboundOrder' },
    // { color: '#E6F7E9', icon: outboundRegister, title: '出库登记' },
    { color: '#E2EBFC', icon: option, title: '部门管理', path: 'departmentManagement' },
    { color: '#FFF5E6', icon: analyze, title: '统计报表' },
    { color: '#DFF8FB', icon: itemClassify, title: '选项设置', path: 'option' },
    { color: '#E6F7E9', icon: supplier, title: '供应商', path: 'supplier' },
    { color: '#FFECEC', icon: recipient, title: '员工管理', path: 'employee' },
    { color: '#E2EBFC', icon: putinStorage, title: '入库单', path: 'godownEntry' },
    { color: '#E2EBFC', icon: list, title: '库存查询', path: 'inventory' },
    { color: '#E6F7E9', icon: quota, title: '部门定额', path: 'branchQuota' },
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
