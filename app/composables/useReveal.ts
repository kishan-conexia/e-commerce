/**
 * v-reveal — scroll-triggered entrance directive.
 *
 * Usage:
 *   v-reveal                     → fade-up on intersect
 *   v-reveal="100"               → fade-up with 100ms delay
 *   v-reveal="{ delay: 200 }"   → fade-up with 200ms delay
 *
 * Registers a single shared IntersectionObserver for performance.
 */
import type { Directive, DirectiveBinding } from 'vue'

const OBSERVED = new WeakSet<Element>()

let observer: IntersectionObserver | null = null
const delayMap = new WeakMap<Element, number>()

function getObserver(): IntersectionObserver {
    if (observer) return observer

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement
                    const delay = delayMap.get(el) || 0

                    if (delay > 0) {
                        setTimeout(() => el.classList.add('revealed'), delay)
                    } else {
                        el.classList.add('revealed')
                    }

                    observer!.unobserve(el)
                    OBSERVED.delete(el)
                    delayMap.delete(el)
                }
            })
        },
        {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px',
        }
    )

    return observer
}

function applyInitialStyles(el: HTMLElement) {
    el.classList.add('reveal-hidden')
}

function parseDelay(binding: DirectiveBinding): number {
    if (typeof binding.value === 'number') return binding.value
    if (binding.value && typeof binding.value === 'object' && 'delay' in binding.value) {
        return binding.value.delay
    }
    return 0
}

export const vReveal: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        applyInitialStyles(el)
        const delay = parseDelay(binding)
        if (delay > 0) delayMap.set(el, delay)
        getObserver().observe(el)
        OBSERVED.add(el)
    },
    unmounted(el: HTMLElement) {
        if (OBSERVED.has(el)) {
            getObserver().unobserve(el)
            OBSERVED.delete(el)
            delayMap.delete(el)
        }
    },
}
