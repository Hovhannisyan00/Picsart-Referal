/* eslint-disable jsx-a11y/label-has-associated-control */
import { EditorBlank, EditorBlankBody, EditorBlankFooter, EditorBlankHeader } from '@picsart/ds-components/EditorBlank';
import { Button, ButtonSizeMD } from '@picsart/ds-components/Button';
import { useTranslator } from '@picsart/rc/services/localization';
import { IconArrowLeftLarge } from '@picsart/ds-foundation/Icons/IconArrowLeftLarge';
import { IconCrossLarge } from '@picsart/ds-foundation/Icons/IconCrossLarge';
import { BadgeTypes } from '@picsart/ds-components/Badge';
import { getContext } from '@picsart/miniapps-sdk';
import { Text, TextElementTypes } from '@picsart/ds-components/Text';
import useStyles from './styles';
import { LayoutType } from './types';

function Layout({ title }: LayoutType) {
  const t = useTranslator();
  const styles = useStyles({ isHacker: true });
  const link = 'https://picsart.com/';

  // const CopyLinkComponent = () => {
  //   // const classes = useStyles();

  //   const copyToClipboard = () => {
  //     navigator.clipboard
  //       .writeText(link)
  //       .then(() => {
  //         alert('Link copied to clipboard!');
  //       })
  //       .catch(error => {
  //         console.log('Failed to copy link:', error);
  //       });
  //   };
  // };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        // alert('Text copied to clipboard!');
      })
      .catch(() => {
        // console.error('Failed to copy text: ', err);
      });
  };
  return (
    <EditorBlank
      __isRootEntryElement
      header={
        <EditorBlankHeader
          startAction={{
            icon: IconArrowLeftLarge,
            action: () => {},
          }}
          endAction={{
            icon: IconCrossLarge,
            action: async () => {
              await getContext().handlers.close();
            },
          }}
          title={title}
          count={1000}
          badge={BadgeTypes.Pro}
        />
      }
      body={
        <EditorBlankBody>
          <div className={styles.content}>
            <Text className={styles.code} elementType={TextElementTypes.H1}>
              {t('Send it to your 10 friends and get reverds!!')}
            </Text>
          </div>
          <form className={styles.form}>
            <label style={{ color: 'white' }}>Email</label>
            <input type="text" />
            <Button onClick={handleCopy} isFullWidth={false} size={ButtonSizeMD}>
              Coppy Link
            </Button>
            <Button onClick={handleCopy} isFullWidth={false} size={ButtonSizeMD}>
              Send
            </Button>
          </form>
          {/* <div style={{ backgroundColor: 'black', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}>
            <Text className={styles.code} elementType={TextElementTypes.H1} style={{ color: 'white', fontSize: '15px' }}>
              {t(link)}
            </Text>
            <Button onClick={handleCopy} isFullWidth={false} size={ButtonSizeMD} style={{ backgroundColor: '#ff007f', color: 'white', padding: '10px 20px', borderRadius: '4px', fontWeight: 'bold' }}>
              Coppy Link
            </Button>
            <label>Email</label>
            <input type="text" />
          </div> */}
        </EditorBlankBody>
      }
      footer={
        <EditorBlankFooter>
          <Button isFullWidth size={ButtonSizeMD}>
            Primary Action
          </Button>
        </EditorBlankFooter>
      }
    />
  );
}

export default Layout;
