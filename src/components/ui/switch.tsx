import { IonToggle } from '@ionic/react'
import { cn } from '@/lib/utils'

type SwitchProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

export function Switch({ checked, onCheckedChange, className }: SwitchProps) {
  return (
    <IonToggle
      mode="ios"
      checked={checked}
      onIonChange={(e) => onCheckedChange(e.detail.checked)}
      className={cn('switch-pixel', className)}
    />
  )
}
