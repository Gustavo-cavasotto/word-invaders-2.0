import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

type SwitchProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

export function Switch({ checked, onCheckedChange, className }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        'relative h-8 w-[54px] flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200',
        checked ? 'bg-alien-green' : 'bg-toggle-off',
        className
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'block h-[26px] w-[26px] rounded-full bg-white shadow-md transition-transform duration-200 will-change-transform',
          checked ? 'translate-x-[25px]' : 'translate-x-[3px]'
        )}
      />
    </SwitchPrimitive.Root>
  )
}
