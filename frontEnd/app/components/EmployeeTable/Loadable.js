/**
 *
 * Asynchronously loads the component for EmployeeTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
