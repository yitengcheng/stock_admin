import { Button, Calendar, Form, Modal, Statistic, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.module.less';
import { PlusOutlined } from '@ant-design/icons';
import MenuGird from './MenuGird';
import useStateRef from 'react-usestateref';
import { post } from '../../axios';
import apis from '../../apis';
import { useNavigate } from 'react-router-dom';
import * as echarts from 'echarts';
import lodash from 'lodash';
import FormTextArea from '../../component/form/FormTextArea';
import FormDatePicker from '../../component/form/FormDatePicker';
import dayjs from 'dayjs';
import { getStorage } from '../../localStorage';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import queryStock from '../../assets/images/queryStock.png';
import workOrder from '../../assets/images/workOrder.png';
import putInStorageImage from '../../assets/images/putInStorageImage.png';

const { Title } = Typography;

export default () => {
  const navigator = useNavigate();
  const [numberTotal, setNumberTotal] = useStateRef({});
  const [tableData, setTableData] = useStateRef([]);
  const [matterForm] = Form.useForm();
  const [currentDate, setCurrentDate] = useStateRef(dayjs());
  const [matterList, setMatterList] = useStateRef([]);
  const userInfo = getStorage('userInfo');

  const stateAnimation = {
    duration: 300,
    easing: 'cubicOut',
  };

  useEffect(async () => {
    setNumberTotal(await post(apis.stockStatisticalNumber));
    initWarringGoodsEcharts();
    initTableData();
    matterForm.setFieldValue('recordTime', dayjs());
    userInfo?.type === 2 && navigator('goodsRequisition', { replace: true });
  }, []);

  useEffect(() => {
    initMattersList();
  }, [currentDate]);

  const selectDay = (date) => {
    setCurrentDate(date);
    matterForm.setFieldValue('recordTime', date);
  };
  const initWarringGoodsEcharts = () => {
    post(apis.stockWarringStatistical).then((res) => {
      const myChart = echarts.init(document.getElementById('warringGoods'));
      const xAxisData = lodash.map(res, 'name');
      let data = [];
      const borderRadius = [8, 8, 0, 0];
      res.map((item) => {
        if (item?.inventoryMax && item?.inventoryNumber > item?.inventoryMax) {
          data.push({
            value: item?.inventoryNumber,
            itemStyle: {
              color: '#00ae1c',
              borderRadius,
            },
          });
        } else if (item?.inventoryMin && item?.inventoryNumber < item?.inventoryMin) {
          data.push({
            value: item?.inventoryNumber,
            itemStyle: {
              color: '#ff9502',
              borderRadius,
            },
          });
        } else {
          data.push({
            value: item?.inventoryNumber,
            itemStyle: {
              color: '#3662ec',
              borderRadius,
            },
          });
        }
      });
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        label: {
          show: true,
          position: 'top',
        },
        series: [
          {
            data,
            type: 'bar',
            barWidth: '10%',
          },
        ],
        stateAnimation,
      });
    });
  };
  const initTableData = () => {
    post(apis.goodBalanceTable, {}).then((res) => {
      setTableData(res?.list);
    });
  };
  const modalMatters = () => {
    Modal.confirm({
      title: '添加事项',
      content: (
        <Form form={matterForm}>
          <FormDatePicker name="recordTime" label="日期" required={false} />
          <FormTextArea label="内容" name="content" required={false} />
        </Form>
      ),
      onOk: () => {
        matterForm.validateFields().then((res) => {
          post(apis.addMatters, res).then(() => {
            matterForm.setFieldValue('content', '');
            initMattersList();
          });
        });
      },
    });
  };
  const initMattersList = () => {
    post(apis.mattersList, { recordTime: currentDate }).then((res) => {
      setMatterList(res);
    });
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')} style={{ flexDirection: 'row' }}>
      <div className={styles.leftContainer}>
        <div className={styles.leftTopBox}>
          <div className={styles.leftTopLeftBox}>
            <div className={styles.boxTitle} style={{ borderBottom: '1px solid #f3f3f3' }}>
              <div className="decoration" />
              <div className={styles.boxTitleText}>常用功能</div>
            </div>
            <MenuGird />
          </div>
          <div className={styles.leftTopRightBox}>
            <div className={styles.leftTopRightTopBox}>
              <div
                className={styles.statisticalBox}
                style={{ marginRight: '0.5vw' }}
                onClick={() => {
                  navigator('inventory');
                }}
              >
                <div className={styles.statisticalTitle}>
                  <div className="decoration" />
                  <div>查询库存</div>
                </div>
                <div className={styles.statisticalMain}>
                  <div className={styles.statisticalText}>
                    <span className={styles.statisticalTextTitle}>
                      <Statistic
                        title=""
                        value={numberTotal?.goodTotal}
                        valueStyle={{ color: '#FB3C3C', fontSize: '200%' }}
                      />
                    </span>
                    <span>件</span>
                  </div>
                  <img src={queryStock} className={styles.statisticalImage} />
                </div>
              </div>
              <div
                className={styles.statisticalBox}
                style={{ marginRight: '0.5vw' }}
                onClick={() => {
                  navigator('outboundOrder');
                }}
              >
                <div className={styles.statisticalTitle}>
                  <div className="decoration" />
                  <div>出库单</div>
                </div>
                <div className={styles.statisticalMain}>
                  <div className={styles.statisticalText}>
                    <span className={styles.statisticalTextTitle}>
                      <Statistic
                        title=""
                        value={numberTotal?.outboundOrderTotal}
                        valueStyle={{ color: '#FFC300', fontSize: '200%' }}
                      />
                    </span>
                    <span>件</span>
                  </div>
                  <img src={workOrder} className={styles.statisticalImage} />
                </div>
              </div>
              <div
                className={styles.statisticalBox}
                onClick={() => {
                  navigator('godownEntry');
                }}
              >
                <div className={styles.statisticalTitle}>
                  <div className="decoration" />
                  <div>入库单</div>
                </div>
                <div className={styles.statisticalMain}>
                  <div className={styles.statisticalText}>
                    <span className={styles.statisticalTextTitle}>
                      <Statistic
                        title=""
                        value={numberTotal?.godownEntryTotal}
                        valueStyle={{ color: '#186CFF', fontSize: '200%' }}
                      />
                    </span>
                    <span>件</span>
                  </div>
                  <img src={putInStorageImage} className={styles.statisticalImage} />
                </div>
              </div>
            </div>
            <div className={styles.leftTopRightBottomBox}>
              <div className={styles.businessHandlingTitle}>
                <div className="decoration" />
                <div>库存结存</div>
              </div>
              <div>
                <Table
                  dataSource={tableData}
                  size="small"
                  bordered
                  pagination={false}
                  scroll={{
                    y: '10vh',
                  }}
                  columns={[
                    { title: '物品名称', dataIndex: 'goodName', align: 'center' },
                    { title: '规格', dataIndex: 'goodModels', align: 'center' },
                    { title: '单位', dataIndex: 'goodUnit', align: 'center' },
                    { title: '单价', dataIndex: 'goodPrice', align: 'center' },
                    {
                      title: '期初库存',
                      align: 'center',
                      children: [
                        { title: '数量', align: 'center', dataIndex: 'startNumber' },
                        {
                          title: '金额',
                          align: 'center',
                          render: (obj) => <span>{obj?.goodPrice * obj?.startNumber}</span>,
                        },
                      ],
                    },
                    {
                      title: '本期入库',
                      align: 'center',
                      children: [
                        { title: '数量', align: 'center', dataIndex: 'godownEntryNum' },
                        {
                          title: '金额',
                          align: 'center',
                          render: (obj) => <span>{obj?.goodPrice * obj?.godownEntryNum}</span>,
                        },
                      ],
                    },
                    {
                      title: '本期出库',
                      align: 'center',
                      children: [
                        { title: '数量', align: 'center', dataIndex: 'outboundNum' },
                        {
                          title: '金额',
                          align: 'center',
                          render: (obj) => <span>{obj?.goodPrice * obj?.outboundNum}</span>,
                        },
                      ],
                    },
                    {
                      title: '期末库存',
                      align: 'center',
                      children: [
                        { title: '数量', align: 'center', dataIndex: 'inventoryNumber' },
                        {
                          title: '金额',
                          align: 'center',
                          render: (obj) => <span>{obj?.goodPrice * obj?.inventoryNumber}</span>,
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.leftBottomBox}>
          <div className={styles.warningTitle}>
            <div className="decoration" />
            <div>库存预警趋势</div>
          </div>
          <div id="warringGoods" style={{ width: '77vw', height: '34vh', margin: '1vh 1vw' }} />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.boxTitle}>
          <div className="decoration" />
          <div className={styles.boxTitleText}>日历</div>
        </div>
        <div>
          <Calendar locale={locale} fullscreen={false} onSelect={selectDay} />
        </div>
        <div className={styles.scheduleTitle}>
          <div className={styles.scheduleTitleText}>今日事项</div>
          <Button
            size="small"
            type="primary"
            shape="circle"
            icon={<PlusOutlined style={{ color: '#fff' }} />}
            onClick={() => {
              modalMatters();
            }}
          />
        </div>
        <div className={styles.scheduleList}>
          <div>事项列表</div>
          {matterList.map((matter) => (
            <Title
              key={matter?._id}
              style={{ marginTop: '0.5vh' }}
              level={3}
              type={matter?.type === 1 ? 'success' : 'warning'}
            >
              {matter?.content}
            </Title>
          ))}
        </div>
      </div>
    </div>
  );
};
