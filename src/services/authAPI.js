import { supabase } from './supabaseClient'

export const authAPI = {
    /**
     * Register user baru dengan email dan password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<{data, error}>}
     */
    async register(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        return { data, error }
    },

    /**
     * Login dengan email dan password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<{data, error}>}
     */
    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    },

    /**
     * Logout user yang sedang login
     * @returns {Promise<{error}>}
     */
    async logout() {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    /**
     * Ambil data user yang sedang login
     * @returns {Promise<{data, error}>}
     */
    async getCurrentUser() {
        const { data, error } = await supabase.auth.getUser()
        return { data, error }
    },
}
