import { Tree, Typography } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import styles from './index.module.less';

export default (props: any) => {
  const { level = 5, title, onClick } = props;
  const [treeData, setTreeData] = useStateRef([]);
  const [expande, setExpande, expandeRef] = useStateRef([]);

  useEffect(async () => {
    try {
      const res = await post(apis.departsTree);
      setTreeData(res?.children);
      setExpande([res?.children?.[0]?.id]);
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
      <Tree
        onExpand={onExpand}
        onSelect={clickItem}
        treeData={treeData}
        expandedKeys={expandeRef.current}
        showLine
        fieldNames={{ title: 'name', key: 'id', children: 'children' }}
      />
    </div>
  );
};
