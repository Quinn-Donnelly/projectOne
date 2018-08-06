/**
 *
 * Asynchronously loads the component for EmployeeInformationForm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
