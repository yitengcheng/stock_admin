import GodownEntry from '@/pages/GodownEntry';
import OutboundOrder from '@/pages/OutboundOrder';
import IntegratedQuery from '@/pages/IntegratedQuery';
import Inventory from '@/pages/Inventory';
import Home from '@/pages/Home/Home.tsx';
import BranchQuota from '@/pages/BranchQuota';
import ApplicationAnalysis from '@/pages/ApplicationAnalysis';
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

export const routers = [
  { key: 'item-0', path: '', element: Home, label: '工作台' },
  { key: 'item-1', path: 'outboundOrder', element: OutboundOrder, label: '出库单' },
  { key: 'item-1-2', path: 'godownEntry', element: GodownEntry, label: '入库单' },
  { key: 'item-1-3', path: 'integratedQuery', element: IntegratedQuery, label: '出入库查询' },
  { key: 'item-1-4', path: 'inventory', element: Inventory, label: '物品清单' },
  { key: 'item-2-1', path: 'branchQuota', element: BranchQuota, label: '部门定额' },
  { key: 'item-2-2', path: 'applicationAnalysis', element: ApplicationAnalysis, label: '领用分析' },
  { key: 'item-3-1', path: 'applyForGoods', element: ApplyForGoods, label: '物品申领' },
  { key: 'item-3-2', path: 'applyForGoodsHistory', element: ApplyForGoodsHistory, label: '申领历史' },
  { key: 'item-4', path: 'stockInquiry', element: StockInquiry, label: '库存查询' },
  { key: 'item-5-1', path: 'buMenLingYong', element: BuMenLingYong, label: '部门领用汇总表' },
  { key: 'item-5-2', path: 'chaoXianKuCunYuJing', element: ChaoXianKuCunYuJing, label: '超限库存预警表' },
  { key: 'item-5-3', path: 'kuCunBianDong', element: KuCunBianDong, label: '库存变动汇总表' },
  { key: 'item-5-4', path: 'renYuanLingYong', element: RenYuanLingYong, label: '人员领用汇总表' },
  { key: 'item-5-5', path: 'shangJiaGongHuo', element: ShangJiaGongHuo, label: '商家供货汇总表' },
  { key: 'item-5-6', path: 'shouFaJieCun', element: ShouFaJieCun, label: '收发结存汇总表' },
  { key: 'item-5-7', path: 'wuPinChuRu', element: WuPinChuRu, label: '物品出入汇总表' },
  { key: 'item-5-8', path: 'wuPinFenLei', element: WuPinFenLei, label: '物品分类汇总表' },
  { key: 'item-5-9', path: 'zuHeChaXun', element: ZuHeChaXun, label: '组合查询统计表' },
  { key: 'item-6', path: 'departmentManagement', element: DepartmentManagement, label: '部门管理' },
  { key: 'item-7', path: 'employee', element: Employee, label: '员工管理' },
  { key: 'item-8', path: 'supplier', element: Supplier, label: '供应商管理' },
  { key: 'item-9', path: 'option', element: Option, label: '选项管理' },
  { key: 'item-10', path: 'auditSetup', element: AuditSetup, label: '审核设置' },
  { key: 'item-3-3', path: 'checkOutboundOrder', element: CheckOutboundOrder, label: '审批列表' },
  { key: 'item-3-4', path: 'checkOutboundOrderHistory', element: CheckOutboundOrderHistory, label: '审批历史' },
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
    children: [
      {
        label: '出库单',
        key: 'item-1-1',
        path: 'outboundOrder',
      },
      {
        label: '入库单',
        key: 'item-1-2',
        path: 'godownEntry',
      },
      {
        label: '出入库查询',
        key: 'item-1-3',
        path: 'integratedQuery',
      },
    ],
  },
  {
    label: '部门定额',
    key: 'item-2',
    path: 'branchQuota',
    // children: [
    //   {
    //     label: '部门定额',
    //     key: 'item-2-1',
    //     path: 'branchQuota',
    //   },
    //   {
    //     label: '领用分析',
    //     key: 'item-2-2',
    //     path: 'applicationAnalysis',
    //   },
    // ],
  },
  {
    label: '物品申领',
    key: 'item-3',
    children: [
      {
        label: '审批列表',
        key: 'item-3-3',
        path: 'checkOutboundOrder',
      },
      {
        label: '审批历史',
        key: 'item-3-4',
        path: 'checkOutboundOrderHistory',
      },
      {
        label: '物品申领',
        key: 'item-3-1',
        path: 'applyForGoods',
      },
      {
        label: '申领历史',
        key: 'item-3-2',
        path: 'applyForGoodsHistory',
      },
    ],
  },
  {
    label: '库存查询',
    path: 'inventory',
    key: 'item-4',
  },
  {
    label: '统计报表',
    key: 'item-5',
    children: [
      {
        label: '部门领用汇总表',
        key: 'item-5-1',
        path: 'buMenLingYong',
      },
      {
        label: '超限库存预警表',
        key: 'item-5-2',
        path: 'chaoXianKuCunYuJing',
      },
      {
        label: '库存变动汇总表',
        key: 'item-5-3',
        path: 'kuCunBianDong',
      },
      {
        label: '人员领用汇总表',
        key: 'item-5-4',
        path: 'renYuanLingYong',
      },
      {
        label: '商家供货汇总表',
        key: 'item-5-5',
        path: 'shangJiaGongHuo',
      },
      {
        label: '收发结存汇总表',
        key: 'item-5-6',
        path: 'shouFaJieCun',
      },
      // {
      //   label: '物品出入汇总表',
      //   key: 'item-5-7',
      //   path: 'wuPinChuRu',
      // },
      {
        label: '物品分类汇总表',
        key: 'item-5-8',
        path: 'wuPinFenLei',
      },
      // {
      //   label: '组合查询统计表',
      //   key: 'item-5-9',
      //   path: 'zuHeChaXun',
      // },
    ],
  },
];

export const commonMenus = [
  {
    label: '工作台',
    path: '',
    key: 'item-0',
  },

  {
    label: '物品申领',
    key: 'item-3',
    children: [
      {
        label: '物品申领',
        key: 'item-3-1',
        path: 'applyForGoods',
      },
      {
        label: '申领历史',
        key: 'item-3-2',
        path: 'applyForGoodsHistory',
      },
    ],
  },
];
