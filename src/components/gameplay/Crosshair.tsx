export function Crosshair() {
  return (
    <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
      <svg
        viewBox="0 0 100 100"
        width="96"
        height="96"
        style={{ filter: 'drop-shadow(0 0 8px rgba(166,232,92,.6))' }}
      >
        <circle cx="50" cy="50" r="30" fill="none" stroke="#A6E85C" strokeWidth="3" />
        <circle cx="50" cy="50" r="3.5" fill="#A6E85C" />
        <line x1="50" y1="8"  x2="50" y2="24" stroke="#A6E85C" strokeWidth="3" />
        <line x1="50" y1="76" x2="50" y2="92" stroke="#A6E85C" strokeWidth="3" />
        <line x1="8"  y1="50" x2="24" y2="50" stroke="#A6E85C" strokeWidth="3" />
        <line x1="76" y1="50" x2="92" y2="50" stroke="#A6E85C" strokeWidth="3" />
      </svg>
    </div>
  )
}
