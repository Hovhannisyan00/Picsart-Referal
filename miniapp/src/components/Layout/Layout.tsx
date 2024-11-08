/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { EditorBlank, EditorBlankBody, EditorBlankFooter, EditorBlankHeader } from '@picsart/ds-components/EditorBlank';
import { IGeneralInformation } from '@picsart/miniapps-sdk/types';
import { Button, ButtonSizeMD } from '@picsart/ds-components/Button';
import { useTranslator } from '@picsart/rc/services/localization';
import { IconArrowLeftLarge } from '@picsart/ds-foundation/Icons/IconArrowLeftLarge';
import { IconCrossLarge } from '@picsart/ds-foundation/Icons/IconCrossLarge';
import { BadgeTypes } from '@picsart/ds-components/Badge';
import { getContext } from '@picsart/miniapps-sdk';
import ColorGrid from 'components/cube-days/index';
import { Text, TextElementTypes } from '@picsart/ds-components/Text';
import axios from 'axios';
import { LayoutType } from './types';
import useStyles from './styles';

interface PostData {
  message?: {
    userID: number;
    referralCount: number;
    _id: string;
    __v: number;
  };
  error?: string;
}

const constext = getContext().general;

function Layout({ title }: LayoutType) {
  const [isUserSingin, setisUserSingin] = useState<boolean | undefined>(undefined);
  const [UserID, setUserID] = useState<number | undefined>(undefined);
  // const [postData, setPostData] = useState<PostData | { error: any } | null>(null);
  const userID = UserID ?? 0;
  const [postData, setPostData] = useState<PostData | null>(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const general: IGeneralInformation = constext;
    setUserID(general.auth.getState().id);
    setisUserSingin(general.auth.getState().isAuthorized);
    axios
      .post(
        'http://localhost:3333/users',
        {
          userID: 20,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type to application/json
          },
        },
      )
      .then(response => {
        console.log(response); // Log the response
        setUserData(response.data.message); // Save the user data to state
        setLoading(false); // Set loading to false after receiving the data
      })
      .catch(msg => {
        setError(msg); // Handle any error that occurs
        setLoading(false); // Set loading to false after an error
      });
  }, [UserID]);

  const t = useTranslator();
  const styles = useStyles({ isHacker: true });
  const link = 'https://picsart.com/';
  const [isHovered, setIsHovered] = useState(false);
  const [isHovere, setIsHovere] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => alert('Link copied to clipboard!'));
  };

  const handleSendClick = () => {
    alert('Email sent successfully');
  };

  if (isUserSingin === false) {
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
          startAction={{ icon: IconArrowLeftLarge, action: () => {} }}
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
              {t('Send it to your 10 friends and get rewards!')}
            </Text>
          </div>
          {postData && postData.message && (
            <div>
              <div>User ID: {postData.message.userID}</div>
              <div>Referral Count: {postData.message.referralCount}</div>
              {/* Render other properties as needed */}
            </div>
          )}
          <form className={styles.form}>
            <div className={styles.link}>
              <label>Email</label>
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
      footer={<EditorBlankFooter />}
    />
  );
}

export default Layout;
