import { CoinBadge } from "@/components/ui/CoinBadge";
import { ChevronLeft } from "lucide-react";
import { useHistory } from "react-router-dom";

type NavHeaderProps = {
  title: string;
  coins?: number;
};

export function NavHeader({ title, coins }: NavHeaderProps) {
  const history = useHistory();

  return (
    <div className="flex items-center gap-3.5 p-6 z-10">
      <button
        onClick={() => history.goBack()}
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/7 text-white"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>
      <h2 className="flex-1 text-[19px] font-extrabold text-white">{title}</h2>
      {coins !== undefined && <CoinBadge coins={coins} />}
    </div>
  );
}
