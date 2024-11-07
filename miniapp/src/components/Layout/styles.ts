import { createUseStyles } from 'react-jss';
import { Theme, Timings } from '@picsart/ds-foundation';
import { LayoutStylesType } from './types';

const useStyles = createUseStyles<string, LayoutStylesType>(
  {
    content: {
      display: 'flex',
      // alignItems: 'center',
      justifyContent: 'center',
      height: '10%',
    },
    '@keyframes animation': {
      from: {
        backgroundPosition: 0,
      },
      to: {
        backgroundPosition: '10%',
      },
    },
    code: {
      display: ({ isHacker }: LayoutStylesType) => isHacker && 'inline-block',
      backgroundImage: `linear-gradient(
      45deg,
      ${Theme.accents.primary.base.default},
      ${Theme.accents.secondary.base.default},
      ${Theme.accents.secondary.base.default},
      ${Theme.accents.primary.base.default}
      )`,
      backgroundSize: ['300%', '100%'],
      backgroundClip: 'text',
      color: 'transparent',
      animation: `$animation ${Timings.Long} linear infinite`,
    },
    form: {
      display: 'flex',
      alignItems: 'top',
      margin: '0',
      padding: '0',
    },
  },
  {
    name: 'layout',
  },
);

export default useStyles;
