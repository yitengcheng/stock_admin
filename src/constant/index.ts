export const DEFAULT_APPNAME = '库存管理系统';
export const GENDER_OPTION = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
  { label: '未知', value: 3 },
];
export const EMPLOYEE_TYPE = [
  { label: '管理者', value: 1 },
  { label: '普通员工', value: 2 },
];
export const OPTION_TYPE = [
  { label: '入库类型', value: 1 },
  { label: '出库类型', value: 2 },
  { label: '计量单位', value: 3 },
  { label: '物品类型', value: 4 },
];
export const GODOWNENTRY_TYPE = [
  { label: '正常', value: 1 },
  { label: '作废', value: 2 },
];
export const OUTBOUNDORDER_TYPE = [
  { label: '待审核', value: 1 },
  { label: '审核中', value: 2 },
  { label: '待领用', value: 3 },
  { label: '完成', value: 4 },
  { label: '作废', value: 5 },
];

const dev_url = 'http://localhost:3000';
const build_url = '';

export const API_URL = process.env.NODE_ENV == 'development' ? dev_url : build_url;
