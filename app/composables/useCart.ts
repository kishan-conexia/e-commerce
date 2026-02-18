interface CartItem {
    id: string
    variantId: string
    name: string
    variant: string
    price: number
    quantity: number
    image?: string
}

export function useCart() {
    const isCartOpen = useState<boolean>('cart-open', () => false)
    const items = useState<CartItem[]>('cart-items', () => [])

    const cartCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
    const cartTotal = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))

    function toggleCart() {
        isCartOpen.value = !isCartOpen.value
    }

    function addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
        const existing = items.value.find(i => i.variantId === item.variantId)
        if (existing) {
            existing.quantity += quantity
        } else {
            items.value.push({ ...item, quantity })
        }
        isCartOpen.value = true
    }

    function removeItem(id: string) {
        items.value = items.value.filter(item => item.id !== id)
    }

    function updateQuantity(id: string, quantity: number) {
        if (quantity <= 0) {
            removeItem(id)
            return
        }
        const item = items.value.find(i => i.id === id)
        if (item) item.quantity = quantity
    }

    function clearCart() {
        items.value = []
    }

    return {
        isCartOpen: readonly(isCartOpen),
        items: readonly(items),
        cartCount,
        cartTotal,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
    }
}
