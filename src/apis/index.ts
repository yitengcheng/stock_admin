import user from './user';
import department from './department';
import texus from './texus';
import employee from './employee';

export default {
  ...user,
  ...department,
  ...texus,
  ...employee,
};
