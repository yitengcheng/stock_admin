import GodownEntry from '@/pages/GodownEntry';
import OutboundOrder from '@/pages/OutboundOrder';
import IntegratedQuery from '@/pages/IntegratedQuery';
import Inventory from '@/pages/Inventory';
import Home from '@/pages/Home/Home.tsx';
import BranchQuota from '@/pages/BranchQuota';
import ApplyForGoods from '@/pages/ApplyForGoods';
import ApplyForGoodsHistory from '@/pages/ApplyForGoodsHistory';
import StockInquiry from '@/pages/StockInquiry';
import BuMenLingYong from '@/pages/StatisticalReport/BuMenLingYong';
import ChaoXianKuCunYuJing from '@/pages/StatisticalReport/ChaoXianKuCunYuJing';
import KuCunBianDong from '@/pages/StatisticalReport/KuCunBianDong';
import RenYuanLingYong from '@/pages/StatisticalReport/RenYuanLingYong';
import ShangJiaGongHuo from '@/pages/StatisticalReport/ShangJiaGongHuo';
import ShouFaJieCun from '@/pages/StatisticalReport/ShouFaJieCun';
import WuPinChuRu from '@/pages/StatisticalReport/WuPinChuRu';
import WuPinFenLei from '@/pages/StatisticalReport/WuPinFenLei';
import ZuHeChaXun from '@/pages/StatisticalReport/ZuHeChaXun';
import DepartmentManagement from '@/pages/DepartmentManagement';
import Employee from '@/pages/Employee';
import Supplier from '@/pages/Supplier';
import Option from '@/pages/Option';
import AuditSetup from '@/pages/AuditSetup';
import CheckOutboundOrder from '@/pages/CheckOutboundOrder';
import CheckOutboundOrderHistory from '@/pages/CheckOutboundOrderHistory';
import BasicData from '@/pages/BasicData';
import GoodsRequisition from '@/pages/GoodsRequisition';
import DataStatistics from '@/pages/DataStatistics';
import Explain from '@/pages/Explain';

export const routers = [
  { key: 'item-0', path: '', element: Home, label: '工作台' },
  { key: 'item-1', path: 'basicData', element: BasicData, label: '基本资料' },
  { key: 'item-1-4', path: 'inventory', element: Inventory, label: '物品清单' },
  { key: 'item-2', path: 'branchQuota', element: BranchQuota, label: '部门定额' },
  { key: 'item-4', path: 'stockInquiry', element: StockInquiry, label: '库存查询' },
  { key: 'item-6', path: 'departmentManagement', element: DepartmentManagement, label: '部门管理' },
  { key: 'item-7', path: 'employee', element: Employee, label: '员工管理' },
  { key: 'item-8', path: 'supplier', element: Supplier, label: '供应商管理' },
  { key: 'item-9', path: 'option', element: Option, label: '选项管理' },
  { key: 'item-10', path: 'auditSetup', element: AuditSetup, label: '审核设置' },
  { key: 'item-3', path: 'goodsRequisition', element: GoodsRequisition, label: '物品申领' },
  { key: 'item-5', path: 'dataStatistics', element: DataStatistics, label: '统计报表' },
  { key: 'item-11', path: 'explain', element: Explain, label: '使用手册' },
];

export const menus = [
  {
    label: '工作台',
    path: '',
    key: 'item-0',
  },
  {
    label: '基本资料',
    key: 'item-1',
    path: 'basicData',
  },
  {
    label: '部门定额',
    key: 'item-2',
    path: 'branchQuota',
  },
  {
    label: '物品申领',
    key: 'item-3',
    path: 'goodsRequisition',
  },
  {
    label: '库存查询',
    path: 'inventory',
    key: 'item-4',
  },
  {
    label: '统计报表',
    key: 'item-5',
    path: 'dataStatistics',
  },
  {
    label: '使用手册',
    key: 'item-11',
    path: 'explain',
  },
];

export const commonMenus = [
  {
    label: '物品申领',
    key: 'item-3',
    path: 'goodsRequisition',
  },
];
