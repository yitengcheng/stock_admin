import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import styles from './index.module.less';
import { Layout, Menu, Spin, Breadcrumb, notification, Space, Button, Dropdown } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routers, menus, commonMenus } from '../../routers';
import { getStorage, removeStorage } from '../../localStorage';
import { useRecoilState } from 'recoil';
import { isLoading } from '../../recoil/atom';
import { DEFAULT_APPNAME } from '../../constant';
import { post } from '../../axios';
import apis from '../../apis';
import { DownOutlined } from '@ant-design/icons';
import lodash from 'lodash';

export default () => {
  const { Header, Content } = Layout;
  const [currentKey, setCurrentKey, currentKeyRef] = useStateRef('item-0');
  const navigator = useNavigate();
  const userInfo = getStorage('userInfo');
  const [loading] = useRecoilState(isLoading);
  const [weather, setWeather] = useStateRef({});
  useEffect(() => {
    navigator('');
    initGetWeather();
  }, []);
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const clickMenu = ({ item, key }) => {
    setCurrentKey(key);
    navigator(item?.props?.path);
  };
  const logout = () => {
    removeStorage('token');
    removeStorage('userInfo');
    navigator('/');
  };
  const initGetWeather = async () => {
    try {
      const res = await post(apis.getWeather);
      setWeather(res || {});
    } catch (error) {
      console.log(error);
    }
  };
  const extraBreadcrumbItems = pathSnippets.map((url, index) => {
    if (index !== 0) {
      const newMenus = lodash.flatMap(routers, (o) => {
        if (o?.children) {
          return o.children;
        }
        return o;
      });
      const result = lodash.find(newMenus, (o) => o.path === url);
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{result?.label}</Link>
        </Breadcrumb.Item>
      );
    }
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key={'home'} onClick={() => setCurrentKey('item-0')}>
      <Link to={''}>工作台</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  // const openNotification = () => {
  //   const messageList = [
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: true },
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: true },
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: true },
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: false },
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: false },
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: true },
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: true },
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: true },
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: true },
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: true },
  //     { message: '关于贵阳观山湖区治安管理办法xxxxx', date: '2022-11-08', hasUnread: true },
  //   ];
  //   notification.open({
  //     message: '消息中心',
  //     description: (
  //       <div className={styles.messageCenterBox}>
  //         {messageList.map((data) => (
  //           <div className={styles.messageBox}>
  //             <img src={data.hasUnread ? '/src/assets/images/unread.png' : '/src/assets/images/read.png'} />
  //             <div className={data.hasUnread ? styles.messageUnreadText : styles.messageReadText}>{data.message}</div>
  //             <div className={styles.messageDate}>{data.date}</div>
  //           </div>
  //         ))}
  //       </div>
  //     ),
  //     placement: 'topRight',
  //     duration: 0,
  //     style: {
  //       width: '30vw',
  //       height: '30vh',
  //     },
  //   });
  // };
  const adminItems = [
    {
      key: '1',
      label: (
        <Button
          type="primary"
          onClick={() => {
            navigator('auditSetup');
          }}
        >
          审核设置
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button type="primary" danger onClick={logout}>
          退出登录
        </Button>
      ),
    },
  ];
  const generalItems = [
    {
      key: '1',
      label: (
        <Button type="primary" danger onClick={logout}>
          退出登录
        </Button>
      ),
    },
  ];

  return (
    <Spin spinning={loading} tip="加载中。。。">
      <Layout style={{ height: '100vh' }}>
        <Header className={styles.site_layout_header} style={{ backgroundColor: '#fff' }}>
          <div className={styles['logo_box']}>
            <div>{DEFAULT_APPNAME}</div>
          </div>
          <div className={styles.weather_box}>
            {weather?.temperature && <div style={{ fontSize: '160%' }}>{weather?.temperature}℃</div>}
            <div style={{ fontSize: '120%' }}>{weather?.weather}</div>
            <div style={{ fontSize: '120%' }}>{weather?.city}</div>
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['0']}
            selectedKeys={[currentKeyRef.current]}
            onClick={clickMenu}
            style={{ width: '55vw', paddingLeft: '50px' }}
            items={userInfo?.type === 2 ? commonMenus : menus}
          />
          <div className={styles.headerRight_box}>
            {/* <Badge count={5}>
              <BellOutlined style={{ fontSize: '160%', color: '#0575F3' }} onClick={() => openNotification()} />
            </Badge>
            <div style={{ height: '30%', width: '1px', backgroundColor: '#CFCFCF' }} /> */}
            <div className={styles.userInfo_box}>
              <Dropdown menu={userInfo?.type === 2 ? { items: generalItems } : { items: adminItems }}>
                <Space>
                  <p style={{ color: '#3D3D3D', fontSize: '140%', fontFamily: 'SourceHanSansCN-Bold' }}>
                    {userInfo.name || '暂无'}
                  </p>
                  <DownOutlined style={{ color: '#999999' }} />
                </Space>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content className={styles.container}>
          <Breadcrumb style={{ marginLeft: '1vw', marginTop: '0.5vh' }}>{breadcrumbItems}</Breadcrumb>
          <Outlet />
        </Content>
      </Layout>
    </Spin>
  );
};
