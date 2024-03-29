import { Button, message, Space, Table, Upload } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { post } from '../../axios';
import { randomKey } from '../../utils';
import styles from './index.module.less';
import lodash from 'lodash';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

const List = (props: any, ref: any) => {
  const {
    width,
    height,
    columns,
    onClickRow,
    url,
    onAddBtn,
    addBtnText = '新增',
    onDelBtn,
    name = '',
    params,
    keyword,
    summary,
    buttonList = [],
    uploadParam,
  } = props;
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(undefined);
  const [dataSource, setDataSource] = useState();
  const [dataColumns, setDataColumns] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    initData();
  }, [columns, pageNum, params, keyword]);

  const tableRef = useRef();
  useImperativeHandle(ref, () => ({
    refresh: () => {
      initData();
    },
  }));

  const initData = () => {
    if (columns) {
      let resC = [];
      columns?.map((column) => {
        resC?.push({
          width: column?.title.length * 20 + 20,
          align: 'center',
          ellipsis: false,
          ...column,
        });
      });
      setDataColumns(resC);
    }
    url &&
      post(url, { params, pageNum, pageSize: 10, keyword }).then((res) => {
        const { list } = res;
        setTotal(res?.total);
        let result = [];
        list?.map((item) => {
          result.push({ key: item._id ?? randomKey(), ...item });
        });
        setDataSource(result);
      });
  };
  const deleteData = () => {
    if (selectedRowKeys?.length === 0) {
      message.error('请选择待删除数据');
      return;
    }
    onDelBtn && onDelBtn(selectedRowKeys);
  };
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableTitleBox}>
        <div className={styles.tableTitleTextBox}>
          <div className="decoration" />
          <div className={styles.tableTitleText}>{name}</div>
        </div>
        <div>
          <Space>
            {uploadParam && (
              <Upload
                name="file"
                headers={{ Authorization: `Bearer ${window.localStorage.getItem('token')}` }}
                action={uploadParam?.url}
                maxCount={uploadParam?.maxCount ?? 1}
                onChange={(info) => {
                  uploadParam?.onChange && uploadParam?.onChange(info);
                }}
                showUploadList={false}
              >
                <Button size="small" type="primary">
                  {uploadParam?.text ?? '上传'}
                </Button>
              </Upload>
            )}
            {buttonList.length > 0 &&
              buttonList.map((item) => (
                <Button
                  key={randomKey()}
                  size={item?.size ?? 'small'}
                  type={item?.type ?? 'primary'}
                  icon={item?.icon}
                  onClick={() => {
                    item?.click && item?.click();
                  }}
                >
                  {item?.text}
                </Button>
              ))}
            {onAddBtn && (
              <Button size="small" type="primary" icon={<PlusCircleOutlined />} onClick={() => onAddBtn()}>
                {addBtnText}
              </Button>
            )}
            {onDelBtn && (
              <Button size="small" type="primary" icon={<DeleteOutlined />} danger onClick={() => deleteData()}>
                删除
              </Button>
            )}
          </Space>
        </div>
      </div>
      <Table
        ref={tableRef}
        style={{ width, height }}
        columns={dataColumns}
        dataSource={dataSource}
        bordered
        summary={summary}
        pagination={{ total }}
        // scroll={{ y: height ? height - 60 : undefined, scrollToFirstRowOnChange: true, x: width }}
        onRow={(record) => {
          return {
            onClick: () => {
              onClickRow && onClickRow(record);
            },
          };
        }}
        onChange={(pagination) => {
          const { current } = pagination;
          setPageNum(current);
        }}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(lodash.map(selectedRows, '_id'));
          },
        }}
      />
    </div>
  );
};

export default forwardRef(List);
