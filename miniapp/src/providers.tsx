import { FC, ReactNode, useState } from 'react';
import { getContext } from '@picsart/miniapps-sdk';
import { createGenerateId, JssProvider, SheetsRegistry } from 'react-jss';
import { ReactINTLProvider } from '@picsart/rc/services/localization';
import useMount from './hooks/useMount';

interface IProps {
  children: ReactNode;
}

const registry = new SheetsRegistry();
const generateId = createGenerateId({ minify: false });

const Providers: FC<IProps> = ({ children }) => {
  const [language, setLanguage] = useState(getContext().general.language.getState());

  useMount(() => {
    getContext().general.language.subscribe(nextLanguage => setLanguage(nextLanguage));
  });

  return (
    <ReactINTLProvider projectName="pa_miniapps" language={language} withoutReusableComponents>
      <JssProvider generateId={generateId} registry={registry}>
        {children}
      </JssProvider>
    </ReactINTLProvider>
  );
};

export default Providers;
