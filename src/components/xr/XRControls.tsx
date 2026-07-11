import { IonButton } from '@ionic/react';

interface XRControlsProps {
  isXRSupported: boolean;
  isARActive: boolean;
  onEnterAR: () => void;
  onExitAR: () => void;
}

/**
 * Componente para controles de entrada/saída AR
 */
export function XRControls({
  isXRSupported,
  isARActive,
  onEnterAR,
  onExitAR,
}: XRControlsProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        gap: '10px',
      }}
    >
      {isXRSupported ? (
        <>
          <IonButton
            onClick={onEnterAR}
            disabled={isARActive}
            color={isARActive ? 'success' : 'primary'}
            size="large"
          >
            {isARActive ? '✅ AR Ativa' : '🚀 Enter AR'}
          </IonButton>
          {isARActive && (
            <IonButton onClick={onExitAR} color="danger" size="large">
              ❌ Exit AR
            </IonButton>
          )}
        </>
      ) : (
        <IonButton color="warning" size="large" disabled>
          ⚠️ WebXR não suportado
        </IonButton>
      )}
    </div>
  );
}
