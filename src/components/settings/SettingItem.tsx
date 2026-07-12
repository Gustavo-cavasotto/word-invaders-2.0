import { Switch } from "@/components/ui/switch";

type SettingItemProps = {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function SettingItem({
  title,
  description,
  checked,
  onCheckedChange,
}: SettingItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/7 py-5">
      <div>
        <p className="text-[17px] font-extrabold text-white">{title}</p>
        <p className="mt-1 text-[13px] text-gray-sub">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
