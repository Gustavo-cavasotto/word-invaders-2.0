export function GridFloor() {
  return (
    <>
      <div
        className="absolute bottom-[-6%] z-0 animate-grid-move"
        style={{
          left: '-50%',
          right: '-50%',
          height: '58%',
          transform: 'rotateX(62deg)',
          transformOrigin: 'bottom center',
          backgroundImage: `
            linear-gradient(rgba(166,232,92,.16) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(166,232,92,.16) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '44px 44px',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 45%)',
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 45%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-0"
        style={{
          height: '34%',
          background: 'radial-gradient(60% 90% at 50% 100%, rgba(166,232,92,.14), transparent 70%)',
        }}
      />
    </>
  )
}
