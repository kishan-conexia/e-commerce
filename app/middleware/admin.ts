export default defineNuxtRouteMiddleware(async (to) => {
    const user = useSupabaseUser()
    const client = useSupabaseClient()

    // Not authenticated → login
    if (!user.value) {
        return navigateTo('/account')
    }

    // Check admin role from profiles table
    const { data: profile } = await client
        .from('profiles')
        .select('role')
        .eq('id', user.value.id)
        .single()

    if (!profile || profile.role !== 'admin') {
        return navigateTo('/')
    }
})
