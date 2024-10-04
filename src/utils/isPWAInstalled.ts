export const isPWAInstalled = () => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.userAgent.includes('TWA') ||
    window.navigator.userAgent.includes('com.android.chrome')
  );
};
