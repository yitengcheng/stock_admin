import { Button, Form, message, Modal, Space } from 'antd';
import React, { useEffect, useRef } from 'react';
import useStateRef from 'react-usestateref';
import FormInput from '../../component/form/FormInput';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';
import FormSwitch from '../../component/form/FormSwitch';
import ItemClassifyOption from '../../component/leftCommon/ItemClassifyOption';
import MyModal from '../../component/common/MyModal';
import GoodDetail from '../../component/popupComponent/GoodDetail';
import apis from '../../apis';
import { post } from '../../axios';
import { initSupplierOption, initUnitOption } from '../../utils/initOption';

export default () => {
  const [screenForm] = Form.useForm();
  const tableRef = useRef(0);
  const modalRef = useRef(0);
  const [classification, setClassification] = useStateRef();
  const [good, setGood, goodRef] = useStateRef({});
  const [searchParams, setSearchParams] = useStateRef({});
  const [unitOption, setUnitOption] = useStateRef([]);
  const [suppliersOption, setSuppliersOption] = useStateRef([]);

  useEffect(async () => {
    setUnitOption(await initUnitOption());
    setSuppliersOption(await initSupplierOption());
  }, []);

  const selectGoodClassify = (id) => {
    if (id === 1) {
      setClassification(undefined);
    } else {
      setClassification(id);
    }
  };
  const delGoods = (ids) => {
    Modal.confirm({
      content: '确认是否删除物品',
      onOk: () => {
        post(apis.delGoods, { ids }).then(() => {
          tableRef.current.refresh();
        });
      },
    });
  };
  const search = () => {
    screenForm.validateFields().then((values) => {
      setSearchParams(values);
    });
  };
  const downGood = () => {
    post(apis.downGood, { classification, ...searchParams }).then((res) => {
      window.open(`https://stock.qiantur.com/${res.url}`, '_blank');
    });
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')} style={{ flexDirection: 'row' }}>
      <ItemClassifyOption onClick={selectGoodClassify} url={apis.options} />
      <div className="mainContainer">
        <TableScreen label="物品清单">
          <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
            <FormInput label="关键字" required={false} name="keyword" />
            <FormSelect label="单位" required={false} name="unit" options={unitOption} />
            <FormSelect label="供应商" required={false} name="supplierId" options={suppliersOption} />
            <FormSwitch label="包含零件库" required={false} name="zero" options={['不包含', '包含']} />
            <Button type="primary" onClick={search}>
              查询
            </Button>
          </Form>
        </TableScreen>
        <MyTable
          ref={tableRef}
          url={apis.goodTable}
          params={{ classification, ...searchParams }}
          uploadParam={{
            url: '/api/upload/insertGoods',
            text: '批量录入物品',
            onChange: (info) => {
              if (info?.file?.response) {
                const { msg } = info?.file?.response;
                message.success(msg);
                tableRef.current.refresh();
              }
            },
          }}
          buttonList={[
            { text: '下载物品清单', click: downGood },
            {
              text: '下载模板',
              click: () => {
                window.open(`https://stock.qiantur.com/zip/物品清单模板.xlsx`, '_blank');
              },
            },
          ]}
          onAddBtn={() => {
            modalRef.current.openModal();
          }}
          onDelBtn={(ids) => {
            delGoods(ids);
          }}
          columns={[
            { title: '物品名称', dataIndex: 'name' },
            {
              title: '物品分类',
              dataIndex: 'classification',
              render: (obj) => <span>{obj?.name || '暂无'}</span>,
            },
            { title: '规格型号', dataIndex: 'models' },
            { title: '单位', dataIndex: 'unit', render: (obj) => <span>{obj?.name || '暂无'}</span> },
            { title: '单价', dataIndex: 'price' },
            { title: '品牌', dataIndex: 'brand' },
            {
              title: '是否为固定资产',
              dataindex: 'hasFixed',
              render: (obj) => <span>{obj?.hasFixed ? '是' : '否'}</span>,
            },
            {
              title: '固定资产编码',
              render: (obj) => <span>{obj?.hasFixed ? obj.fixedNumber : '暂无'}</span>,
            },
            { title: '库存数量', dataIndex: 'inventoryNumber' },
            { title: '库存上限', dataIndex: 'inventoryMax' },
            { title: '库存下限', dataIndex: 'inventoryMin' },
            {
              title: '操作',
              fixed: 'right',
              render: (text, record) => (
                <Space>
                  <Button
                    size="small"
                    type="link"
                    onClick={() => {
                      setGood(record);
                      modalRef.current.openModal();
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() => {
                      delGoods([record.key]);
                    }}
                  >
                    删除
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </div>
      <MyModal
        ref={modalRef}
        title="物品"
        reset={() => {
          setGood({});
        }}
      >
        <GoodDetail
          refresh={() => {
            tableRef.current.refresh();
          }}
          closeModal={() => {
            modalRef.current.closeModal();
          }}
          good={goodRef.current}
        />
      </MyModal>
    </div>
  );
};
