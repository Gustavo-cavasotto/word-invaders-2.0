import { Switch } from "@/components/ui/switch";

type SettingItemProps = {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onTest?: () => void;
};

export function SettingItem({
  title,
  description,
  checked,
  onCheckedChange,
  onTest,
}: SettingItemProps) {
  return (
    <div className="border-b border-white/7 py-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-[17px] font-extrabold text-white">{title}</p>
          <p className="mt-1 text-[13px] text-gray-sub">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>

      {onTest && (
        <button
          onClick={onTest}
          className="mt-3 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12px] font-bold text-gray-sub transition-colors active:bg-white/10"
        >
          ▶ Testar
        </button>
      )}
    </div>
  );
}
