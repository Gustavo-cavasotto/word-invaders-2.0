type CoinBadgeProps = {
  coins: number;
};

export function CoinBadge({ coins }: CoinBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/8 py-1 pl-2 pr-3">
      <span
        className="size-5 shrink-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #FFE49A, #F2C94C 60%, #C99A2E)",
          boxShadow: "inset 0 -2px 3px rgba(0,0,0,.25)",
        }}
      />
      <b className="text-[14px] text-coin">{coins}</b>
    </div>
  );
}
