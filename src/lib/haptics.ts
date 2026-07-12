/** Vibra o dispositivo por `durationMs` milissegundos. */
export async function vibrate(durationMs = 300): Promise<void> {
  try {
    const { Haptics } = await import('@capacitor/haptics')
    await Haptics.vibrate({ duration: durationMs })
  } catch {
    navigator.vibrate?.(durationMs)
  }
}
