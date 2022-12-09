import { Button, Calendar, Statistic, Table } from 'antd';
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

export default () => {
  const navigator = useNavigate();
  const [numberTotal, setNumberTotal] = useStateRef({});
  const [warringGoods, setWarringGoods] = useStateRef({});
  const [tableData, setTableData] = useStateRef([]);

  const stateAnimation = {
    duration: 300,
    easing: 'cubicOut',
  };

  useEffect(async () => {
    setNumberTotal(await post(apis.stockStatisticalNumber));
    initWarringGoodsEcharts();
    initTableData();
  }, []);

  const selectDay = (date) => {
    console.log(date.format('YYYY-MM-DD'));
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
    post(apis.goods).then((res) => {
      let result = [];
      res?.map((item) => {
        result.push({ key: item._id ?? randomKey(), ...item });
      });
      setTableData(result);
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
                  <img src="/src/assets/images/queryStock.png" className={styles.statisticalImage} />
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
                  <img src="/src/assets/images/workOrder.png" className={styles.statisticalImage} />
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
                  <img src="/src/assets/images/putInStorageImage.png" className={styles.statisticalImage} />
                </div>
              </div>
            </div>
            <div className={styles.leftTopRightBottomBox}>
              <div className={styles.businessHandlingTitle}>
                <div className="decoration" />
                <div>查询库存</div>
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
                    { title: '物品名称', dataIndex: 'name', align: 'center' },
                    {
                      title: '物品分类',
                      dataIndex: 'classification',
                      align: 'center',
                      render: (obj) => <span>{obj?.name || '暂无'}</span>,
                    },
                    { title: '规格型号', dataIndex: 'models', align: 'center' },
                    {
                      title: '单位',
                      dataIndex: 'unit',
                      align: 'center',
                      render: (obj) => <span>{obj?.name || '暂无'}</span>,
                    },
                    { title: '单价', dataIndex: 'price', align: 'center' },
                    { title: '库存数量', dataIndex: 'inventoryNumber', align: 'center' },
                    { title: '库存数量', dataIndex: 'inventoryNumber', align: 'center' },
                    { title: '库存上限', dataIndex: 'inventoryMax', align: 'center' },
                    { title: '库存数量', dataIndex: 'inventoryNumber', align: 'center' },
                    { title: '库存下限', dataIndex: 'inventoryMin', align: 'center' },
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
          <div id="warringGoods" style={{ width: '77vw', height: '38vh', margin: '1vh 1vw' }} />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.boxTitle}>
          <div className="decoration" />
          <div className={styles.boxTitleText}>日历</div>
        </div>
        <div>
          <Calendar fullscreen={false} onSelect={selectDay} />
        </div>
        <div className={styles.scheduleTitle}>
          <div className={styles.scheduleTitleText}>今日事项</div>
          <Button size="small" type="primary" shape="circle" icon={<PlusOutlined style={{ color: '#fff' }} />} />
        </div>
        <div className={styles.scheduleList}>
          <div>事项列表</div>
        </div>
      </div>
    </div>
  );
};
