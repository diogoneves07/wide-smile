export default function getTimeNow(): number {
  return Date.now ? Date.now() : new Date().getTime();
}
