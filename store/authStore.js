import create from 'zustand'
import { persist,devtools } from 'zustand/middleware'



const authStore = (set) => ({
    isLogin: false,
    successLogin: () => set({ isLogin: true }),
    successLogout: () => set({ isLogin: false }),
})


const createAuthStore = create(
    devtools(
        persist(authStore, {
            name: "Auth",
        })
    )
)

export default createAuthStore;