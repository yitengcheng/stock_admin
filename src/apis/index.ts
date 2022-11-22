import user from './user';
import department from './department';
import texus from './texus';
import employee from './employee';
import suppliers from './suppliers';
import option from './option';

export default {
  ...user,
  ...department,
  ...texus,
  ...employee,
  ...suppliers,
  ...option,
};
