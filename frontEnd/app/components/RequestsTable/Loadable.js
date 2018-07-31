/**
 *
 * Asynchronously loads the component for RequestsTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
