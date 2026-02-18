/**
 * useSmartHeader — lightweight scroll-direction tracker.
 * - isVisible: header should be shown (scroll-up or at top)
 * - isScrolled: page has scrolled past the initial threshold
 * - isAtTop: scroll position is at the very top
 */
export function useSmartHeader() {
    const isVisible = ref(true)
    const isScrolled = ref(false)
    const isAtTop = ref(true)

    let lastScrollY = 0
    let ticking = false
    const SCROLL_THRESHOLD = 10 // min px delta to trigger hide/show
    const TOP_ZONE = 50 // px from top where header is always visible

    function update() {
        const currentY = window.scrollY

        isAtTop.value = currentY < TOP_ZONE
        isScrolled.value = currentY > 30

        // Always show at top
        if (currentY < TOP_ZONE) {
            isVisible.value = true
            lastScrollY = currentY
            ticking = false
            return
        }

        const delta = currentY - lastScrollY

        if (Math.abs(delta) > SCROLL_THRESHOLD) {
            // Scrolling down → hide, scrolling up → show
            isVisible.value = delta < 0
            lastScrollY = currentY
        }

        ticking = false
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(update)
            ticking = true
        }
    }

    onMounted(() => {
        lastScrollY = window.scrollY
        window.addEventListener('scroll', onScroll, { passive: true })
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', onScroll)
    })

    return { isVisible, isScrolled, isAtTop }
}
