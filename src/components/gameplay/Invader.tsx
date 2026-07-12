type InvaderColor = 'green' | 'blue' | 'orange' | 'pink'

type InvaderProps = {
  color: InvaderColor
  style?: React.CSSProperties
}

const gradients: Record<InvaderColor, string> = {
  green:  'radial-gradient(circle at 35% 28%, #C7F09A, #8FD95C 65%, #6FB93F)',
  blue:   'radial-gradient(circle at 35% 28%, #93CBF2, #5AA9E6 65%, #33689C)',
  orange: 'radial-gradient(circle at 35% 28%, #E0AC7F, #C98A5B 65%, #96603A)',
  pink:   'radial-gradient(circle at 35% 28%, #E48BC2, #C75B9B 65%, #8A3268)',
}

const glows: Partial<Record<InvaderColor, string>> = {
  blue:  '0 0 22px rgba(90,169,230,.35)',
  green: '0 0 24px rgba(166,232,92,.45)',
}

export function Invader({ color, style }: InvaderProps) {
  return (
    <div
      className="absolute animate-invader-hover rounded-[26px]"
      style={{
        width: 74,
        height: 74,
        background: gradients[color],
        boxShadow: glows[color],
        ...style,
      }}
    >
      <span className="absolute top-[26px] left-[18px] block h-[11px] w-[11px] rounded-full bg-space-900" />
      <span className="absolute top-[26px] right-[18px] block h-[11px] w-[11px] rounded-full bg-space-900" />
    </div>
  )
}
