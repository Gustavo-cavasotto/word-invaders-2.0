const STARS = [
  { top: '14%', left: '12%' },
  { top: '22%', left: '80%' },
  { top: '38%', left: '28%' },
  { top: '46%', left: '88%' },
  { top: '60%', left: '8%' },
  { top: '70%', left: '70%' },
  { top: '83%', left: '40%' },
]

export function Stars() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {STARS.map((pos, i) => (
        <span
          key={i}
          className="absolute h-0.5 w-0.5 rounded-full bg-white/35"
          style={pos}
        />
      ))}
    </div>
  )
}
