import Game from "@/components/Game";
import { CoinBadge } from "@/components/ui/CoinBadge";
import { ExitConfirmDialog } from "@/components/ui/ExitConfirmDialog";
import { X } from "lucide-react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export function GameplayScreen() {
  const history = useHistory();

  const [exitOpen, setExitOpen] = useState(false);

  return (
    <div className="relative h-full overflow-hidden bg-space-900">
      <div className="absolute inset-0 z-0">
        <Game autoEnterAR />
      </div>

      <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-2">
        <button
          onClick={() => setExitOpen(true)}
          className="flex size-9.5 items-center justify-center rounded-xl bg-white/7 text-white"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        <CoinBadge coins={5} />
      </div>

      <ExitConfirmDialog
        open={exitOpen}
        onOpenChange={setExitOpen}
        onConfirm={() => history.goBack()}
      />
    </div>
  );
}
