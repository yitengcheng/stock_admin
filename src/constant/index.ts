export const DEFAULT_APPNAME = '库存管理系统';
export const GENDER_OPTION = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
  { label: '未知', value: 3 },
];
export const STAFF_STATUS_OPTION = [
  { label: '在职', value: 1 },
  { label: '离职', value: 2 },
];
export const CUSTOMER_TYPE_OPTION = [
  { label: '企业用户', value: 1 },
  { label: '个人用户', value: 2 },
];
export const BOX_STATUS_OPTION = [
  { label: '闲置', value: 1 },
  { label: '已分配', value: 2 },
  { label: '已入库', value: 3 },
  { label: '已出库', value: 4 },
  { label: '换新中', value: 5 },
  { label: '已回收', value: 6 },
  { label: '暂停使用', value: 7 },
];
export const CONTRACT_STATUS_OPTION = [
  { label: '未绑定', value: 1 },
  { label: '已绑定', value: 2 },
];
export const RENTAL_UNITS_OPTION = [
  { label: '天', value: 1 },
  { label: '月', value: 2 },
  { label: '年', value: 3 },
];
export const PAY_STATUS_OPTION = [
  { label: '待审核', value: 1 },
  { label: '支付成功', value: 2 },
];
export const PAY_TYPE_OPTION = [
  { label: '微信支付', value: 1 },
  { label: '支付支付', value: 2 },
  { label: '对公支付', value: 3 },
];
export const LEASE_ORDER_STATUS_OPTION = [
  { label: '分配中', value: 1 },
  { label: '分配完成', value: 2 },
  { label: '已退租', value: 3 },
];
export const THROW_LEASE_STATUS_OPTION = [
  { label: '待审核', value: 1 },
  { label: '待回收箱子', value: 2 },
  { label: '退租成功', value: 3 },
];
export const RENEWORDER_STATUS_OPTION = [
  { label: '待换新', value: 1 },
  { label: '换新中', value: 2 },
  { label: '换新完成', value: 3 },
];
export const PERMISSION_OPTION = [
  { label: '部门模块', value: '100' },
  { label: '员工模块', value: '101' },
  { label: '客户模块', value: '102' },
  { label: '物流箱分类模块', value: '103' },
  { label: '物流箱模块', value: '104' },
  { label: '租赁订单模块', value: '105' },
  { label: '创建租赁订单模块', value: '106' },
  { label: '合同模块', value: '107' },
  { label: '退租模块', value: '108' },
  { label: '换新模块', value: '109' },
];

const dev_url = 'http://localhost:3000';
const build_url = '';

export const API_URL = process.env.NODE_ENV == 'development' ? dev_url : build_url;
