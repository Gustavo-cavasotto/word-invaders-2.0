import { IonButton } from '@ionic/react'

type AmmoHudProps = {
  weaponName: string
  current: number
  total: number
  onReload: () => void
}

export function AmmoHud({ weaponName, current, total, onReload }: AmmoHudProps) {
  const fillPercent = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="z-[3] flex flex-shrink-0 flex-col gap-4 px-5 pb-[42px]">
      <div className="self-start rounded-full border border-alien-green/60 bg-[rgba(20,32,14,0.55)] px-4 py-2 text-sm font-bold text-[#E9FBD6]">
        {weaponName}
      </div>

      <div className="flex items-center gap-3.5">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-black/35">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${fillPercent}%`,
              background: 'linear-gradient(90deg, #B7EC6E, #8FD95C)',
            }}
          />
        </div>

        <span className="text-[15px] font-bold text-[#CFD3DC]">
          {current}/{total}
        </span>

        <IonButton className="btn-reload" onClick={onReload}>
          RECARREGAR
        </IonButton>
      </div>
    </div>
  )
}
