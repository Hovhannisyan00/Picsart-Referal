import { createUseStyles } from 'react-jss';
import { Theme, Timings } from '@picsart/ds-foundation';
import { LayoutStylesType } from './types';

const useStyles = createUseStyles<string, LayoutStylesType>(
  {
    content: {
      display: 'flex',
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
      alignItems: 'start',
      display: 'flex',
      flexDirection: 'column',
      margin: '0',
      padding: '0',
    },
    link: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
      marginBottom: '15px',
    },
    input: {
      height: '35px',
      width: '100%',
      padding: '8px 12px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
      marginBottom: '10px',
      backgroundColor: 'white',
    },
    linkdiv: {
      height: '35px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      display: 'flex',
      gap: '15px',
      margin: '5px 0',
      padding: '12px 16px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontSize: '16px',
      fontWeight: 'bold',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    first: {
      gap: '10px',
      display: 'flex',
      justifyContent: 'center',
    },
    second: {
      gap: '10px',
      display: 'flex',
      justifyContent: 'center',
    },
  },

  { name: 'layout' },
);

export default useStyles;
