import { Tree, Typography } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import styles from './index.module.less';

export default (props: any) => {
  const { level = 5, title = '物品分类', onClick } = props;
  const [data, setData] = useStateRef([]);
  const [expande, setExpande, expandeRef] = useStateRef([]);

  useEffect(async () => {
    try {
      const res = await post(apis.options, { type: 4 });
      let tmp = [{ title: '物品分类', key: 1, children: [] }];
      res.map((item, index) => {
        tmp[0].children.push({ title: item.name, key: item._id });
      });
      setData(tmp);
      setExpande([1]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const clickItem = (select) => {
    onClick && onClick(select[0]);
  };
  const onExpand = (expandedKeys) => {
    setExpande(expandedKeys);
  };

  return (
    <div className={styles.SortingOptionsContainer}>
      <Typography.Title level={level} className={styles.titleContainer}>
        {title}
      </Typography.Title>
      <Tree onExpand={onExpand} onSelect={clickItem} treeData={data} expandedKeys={expandeRef.current} showLine />
    </div>
  );
};
