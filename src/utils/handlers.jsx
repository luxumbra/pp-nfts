

export const useHandleClick = (url, isExternal) => {
    const router = useStore((s) => s.router)
    if (isExternal) {
      if (typeof window !== 'undefined') {
        window.open(url, '_blank')
      }
      return
    }
    () => router.push(url)
  }