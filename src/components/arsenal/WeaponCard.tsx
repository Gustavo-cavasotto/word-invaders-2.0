import { cn } from "@/lib/utils";

type WeaponColor = "green" | "blue" | "orange" | "pink";

export type WeaponCardProps = {
  name: string;
  description: string;
  color: WeaponColor;
  equipped?: boolean;
  price?: number;
};

const iconGradients: Record<WeaponColor, string> = {
  green: "linear-gradient(160deg, #5F9E3C, #2F5B1D)",
  blue: "linear-gradient(160deg, #4C7EB8, #243E63)",
  orange: "linear-gradient(160deg, #B87A45, #6B3E1E)",
  pink: "linear-gradient(160deg, #A8437E, #5C1F44)",
};

export function WeaponCard({
  name,
  description,
  color,
  equipped = false,
  price,
}: WeaponCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3.5 rounded-[18px] border bg-card-dark p-3.5",
        equipped
          ? "border-alien-green/55 shadow-[0_0_0_1px_rgba(166,232,92,.25),0_0_22px_rgba(166,232,92,.12)]"
          : "border-card-border",
      )}
    >
      <div
        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[14px] text-[26px]"
        style={{ background: iconGradients[color] }}
      >
        🔫
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-extrabold text-white">{name}</p>
        <p className="mt-0.5 text-[12.5px] leading-snug text-gray-sub">
          {description}
        </p>
      </div>

      {equipped ? (
        <div
          className="flex-shrink-0 rounded-full px-3.5 py-2 text-[11px] font-black tracking-wider text-[#10240A]"
          style={{ background: "linear-gradient(180deg, #B7EC6E, #8FD95C)" }}
        >
          EQUIPADA
        </div>
      ) : (
        <div className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-white/7 px-3.5 py-2 text-sm font-bold text-[#D7D8DC]">
          <span className="h-3 w-3 rounded-full bg-[#9EA0A6]" />
          {price}
        </div>
      )}
    </div>
  );
}
