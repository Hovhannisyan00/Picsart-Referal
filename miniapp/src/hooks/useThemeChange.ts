import { getContext } from '@picsart/miniapps-sdk';
import useOpen from './useOpen';

const useThemeChange = () => {
  useOpen(() => {
    return getContext().general.theme.subscribe(
      value => {
        const htmlElement = document.getElementsByTagName('html')[0];
        htmlElement.classList.remove(value === 'dark' ? 'light' : 'dark');
        htmlElement.classList.add(value);
      },
      { needPrevious: true },
    );
  });
};

export default useThemeChange;
