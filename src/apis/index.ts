import user from './user';
import department from './department';
import texus from './texus';
import employee from './employee';
import suppliers from './suppliers';
import option from './option';
import good from './good';
import branchQutas from './branchQutas';

export default {
  ...user,
  ...department,
  ...texus,
  ...employee,
  ...suppliers,
  ...option,
  ...good,
  ...branchQutas,
};
