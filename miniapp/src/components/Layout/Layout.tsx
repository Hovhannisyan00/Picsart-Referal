/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { EditorBlank, EditorBlankBody, EditorBlankFooter, EditorBlankHeader } from '@picsart/ds-components/EditorBlank';
import { IGeneralInformation } from '@picsart/miniapps-sdk/types';
import { Button, ButtonSizeMD } from '@picsart/ds-components/Button';
import { useTranslator } from '@picsart/rc/services/localization';
import { IconArrowLeftLarge } from '@picsart/ds-foundation/Icons/IconArrowLeftLarge';
import { IconCrossLarge } from '@picsart/ds-foundation/Icons/IconCrossLarge';
import { BadgeTypes } from '@picsart/ds-components/Badge';
import { getContext } from '@picsart/miniapps-sdk';
import { Text, TextElementTypes } from '@picsart/ds-components/Text';
import { useEffect, useState } from 'react';
import { LayoutType } from './types';
import useStyles from './styles';
import ColorGrid from 'components/cube-days';

const constext = getContext().general;

function Layout({ title }: LayoutType) {
  const [isUserSingin, setisUserSingin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const general: IGeneralInformation = constext;
    setisUserSingin(general.auth.getState().isAuthorized);
  }, []);

  const t = useTranslator();
  const styles = useStyles({ isHacker: true });
  const link = 'https://picsart.com/';
  const [isHovered, setIsHovered] = useState(false);
  const [isHovere, setIsHovere] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert('Email sent successfully!');
        // alert('Text copied to clipboard!');
      })
      .catch(() => {
        // console.error('Failed to copy text: ', err);
      });
  };
  const handleSendClick = () => {
    alert('Text sent successfully');
  };
  if (isUserSingin === false) {
    // flex-direction: 'column',
    return (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '5px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          textAlign: 'center',
          gap: '10px',
          flexDirection: 'column',
          height: '110px',
        }}
      >
        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>↑</span>
        <span>You must be signed in to continue. Please log in to access this feature.</span>
      </div>
    );
  }
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
            <div className={styles.link}>
              <label style={{ color: 'white' }}>Email</label>
              <div className={styles.first}>
                <input className={styles.input} type="email" placeholder="Enter your email" />
                <Button
                  onClick={handleSendClick}
                  isFullWidth={false}
                  size={ButtonSizeMD}
                  style={{
                    transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                    boxShadow: isHovered ? '0 6px 16px rgba(0, 0, 0, 0.15)' : 'none',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    width: '83px',
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Send
                </Button>
              </div>
              <label style={{ color: 'white' }}>Link</label>
              <div className={styles.second}>
                <div className={styles.linkdiv}>{link}</div>
                <Button
                  onClick={handleCopy}
                  isFullWidth={false}
                  size={ButtonSizeMD}
                  style={{
                    transform: isHovere ? 'translateY(-3px)' : 'translateY(0)',
                    boxShadow: isHovere ? '0 6px 16px rgba(0, 0, 0, 0.15)' : 'none',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    width: '90px',
                  }}
                  onMouseEnter={() => setIsHovere(true)}
                  onMouseLeave={() => setIsHovere(false)}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </form>
          <ColorGrid />
        </EditorBlankBody>
      }
      footer={
        <EditorBlankFooter>
          {/* <Button isFullWidth size={ButtonSizeMD}>
            Primary Action
          </Button> */}
        </EditorBlankFooter>
      }
    />
  );
}

export default Layout;
