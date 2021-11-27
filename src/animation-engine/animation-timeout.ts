const hasRAf = typeof window.requestAnimationFrame === 'function';
function clearAnimationTimeout(id: number): void {
  if (hasRAf) {
    return window.cancelAnimationFrame(id);
  }
  return window.clearTimeout(id);
}

export default function animationTimeout(
  callback: () => void,
  timeout?: number | undefined
): number {
  if (hasRAf) {
    const requestAnimationFrameId = window.requestAnimationFrame(() => {
      callback();
      clearAnimationTimeout(requestAnimationFrameId);
    });
    return requestAnimationFrameId;
  }
  return (setTimeout(callback, timeout || 0) as unknown) as number;
}
