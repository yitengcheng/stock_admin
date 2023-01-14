import { Tree, Typography } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import styles from './index.module.less';

export default (props: any) => {
  const { level = 5, title = '物品分类', onClick, url, treeData } = props;
  const [data, setData] = useStateRef([]);
  const [expande, setExpande, expandeRef] = useStateRef([]);

  useEffect(async () => {
    if (url) {
      await init();
    } else {
      setData([{ title, key: 1, children: treeData }]);
      setExpande([1]);
    }
  }, []);

  const clickItem = (select) => {
    onClick && onClick(select[0]);
  };
  const onExpand = (expandedKeys) => {
    setExpande(expandedKeys);
  };
  const init = async () => {
    try {
      const res = await post(url, { type: 4 });
      let tmp = [{ title, key: 1, children: [] }];
      res.map((item) => {
        tmp[0].children.push({ title: item.name, key: item._id });
      });
      setData(tmp);
      setExpande([1]);
    } catch (error) {
      console.log(error);
    }
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
