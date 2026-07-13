import { IonButton, IonIcon } from '@ionic/react';
import { alertCircleOutline, phoneLandscapeOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

interface NoXRProps {
  message?: string;
  showInstructions?: boolean;
}

export function NoXR({ message, showInstructions = true }: NoXRProps) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '30px',
        borderRadius: '16px',
        maxWidth: '90%',
        width: '400px',
        textAlign: 'center',
        zIndex: 2000,
      }}
    >
      <IonIcon
        icon={alertCircleOutline}
        style={{
          fontSize: '64px',
          color: '#ffa500',
          marginBottom: '20px',
        }}
      />

      <h2 style={{ margin: '0 0 15px 0', fontSize: '24px' }}>
        {message ?? t('noXR.message')}
      </h2>

      {showInstructions && (
        <>
          <p style={{ margin: '15px 0', fontSize: '14px', lineHeight: '1.6' }}>
            {t('noXR.intro')}
          </p>

          <div
            style={{
              textAlign: 'left',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>{t('noXR.browserLabel')}</strong> {t('noXR.browserText')}
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>{t('noXR.deviceLabel')}</strong> {t('noXR.deviceText')}
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>{t('noXR.emulatorLabel')}</strong> {t('noXR.emulatorText')}
              </li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <IonButton
              href="https://developers.google.com/ar/devices"
              target="_blank"
              color="primary"
              size="small"
            >
              <IonIcon icon={phoneLandscapeOutline} slot="start" />
              {t('noXR.compatibleDevices')}
            </IonButton>
          </div>
        </>
      )}
    </div>
  );
}

export default NoXR;
