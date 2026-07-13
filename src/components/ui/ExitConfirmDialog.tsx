import { IonButton, IonModal } from '@ionic/react'
import { useTranslation } from 'react-i18next'

type ExitConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function ExitConfirmDialog({ open, onOpenChange, onConfirm }: ExitConfirmDialogProps) {
  const { t } = useTranslation()

  return (
    <IonModal
      isOpen={open}
      onDidDismiss={() => onOpenChange(false)}
      className="exit-modal"
    >
      <div className="rounded-2xl border border-white/10 bg-[#17181C] p-6 shadow-2xl">
        <h2 className="text-[18px] font-extrabold text-white">
          {t('exitDialog.title')}
        </h2>

        <p className="mt-2 text-[14px] leading-relaxed text-gray-sub">
          {t('exitDialog.message')}
        </p>

        <div className="mt-6 flex gap-3">
          <IonButton
            className="btn-dialog btn-dialog-cancel flex-1"
            onClick={() => onOpenChange(false)}
          >
            {t('exitDialog.cancel')}
          </IonButton>

          <IonButton
            className="btn-dialog btn-dialog-confirm flex-1"
            onClick={onConfirm}
          >
            {t('exitDialog.confirm')}
          </IonButton>
        </div>
      </div>
    </IonModal>
  )
}
