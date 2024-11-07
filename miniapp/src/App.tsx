import { useEffect } from 'react';
import { withTabFocus } from '@picsart/ds-foundation/styleHelpers';
import errorLogger from '@picsart/growth-rc/services/errorLogger';

import useOpen from 'hooks/useOpen';
import useThemeChange from 'hooks/useThemeChange';
import { Preloader } from '@picsart/ds-components/Preloader';
import useStyles from './useStyles';
import Layout from './components/Layout';

const miniappOpenLog = 'opening the miniapp now';

const App = () => {
  useStyles();
  useThemeChange();

  useEffect(() => {
    withTabFocus();
  }, []);

  const isOpen = useOpen(() => {
    errorLogger.leaveBreadcrumb(miniappOpenLog, { category: isOpen });
  });

  return isOpen ? <Layout title="Miniapp" /> : <Preloader />;
};

export default App;
