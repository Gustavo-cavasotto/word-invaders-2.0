/** Liga o flash por `durationMs` milissegundos e desliga automaticamente. */
export async function flashTorch(durationMs = 800): Promise<void> {
  try {
    // Tentativa 1: plugin nativo Capacitor (iOS + Android)
    const { Torch } = await import('@capawesome/capacitor-torch')
    const { available } = await Torch.isAvailable()
    if (!available) throw new Error('torch unavailable')
    await Torch.enable()
    setTimeout(() => Torch.disable(), durationMs)
    return
  } catch {
    // Tentativa 2: Web API com constraint `torch` (Android Chrome)
    await flashTorchWebApi(durationMs)
  }
}

async function flashTorchWebApi(durationMs: number): Promise<void> {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  })
  const track = stream.getVideoTracks()[0]
  const capabilities = track.getCapabilities() as MediaTrackCapabilities & { torch?: boolean }

  if (!capabilities.torch) {
    track.stop()
    throw new Error('torch not supported on this device')
  }

  await track.applyConstraints({ advanced: [{ torch: true } as MediaTrackConstraintSet] })
  setTimeout(async () => {
    await track.applyConstraints({ advanced: [{ torch: false } as MediaTrackConstraintSet] })
    track.stop()
  }, durationMs)
}
