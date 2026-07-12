import * as AlertDialog from '@radix-ui/react-alert-dialog'

type ExitConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function ExitConfirmDialog({ open, onOpenChange, onConfirm }: ExitConfirmDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <AlertDialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-48px)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#17181C] p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <AlertDialog.Title className="text-[18px] font-extrabold text-white">
            Sair da partida?
          </AlertDialog.Title>

          <AlertDialog.Description className="mt-2 text-[14px] leading-relaxed text-gray-sub">
            O progresso atual será perdido. Tem certeza que deseja sair?
          </AlertDialog.Description>

          <div className="mt-6 flex gap-3">
            <AlertDialog.Cancel asChild>
              <button className="flex-1 rounded-xl border border-white/10 py-3.5 text-[15px] font-bold text-white bg-white/7 active:opacity-80">
                Continuar
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl py-3.5 text-[15px] font-extrabold text-[#10240A] active:opacity-80"
                style={{
                  background: 'linear-gradient(180deg, #B7EC6E, #8FD95C)',
                  boxShadow: '0 4px 0 #4E8A2B',
                }}
              >
                Sair
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
