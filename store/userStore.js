import create from 'zustand';
import axios from 'axios'
import Cookies from 'js-cookie'
import {devtools, persist} from 'zustand/middleware'

// const token = Cookies.get('token')

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
//     ? process.env.NEXT_PUBLIC_BACKEND_URL
//     : "https://api.printpackmachines.com";
// axios.defaults.withCredentials = true;

// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


const userStore = (set) => ({
    user: null,
    fetchUser: async () => {
        try {
        const token = Cookies.get("token");

        const response = await axios.get('/api/user/me',{ 
                headers: {"Authorization" : `Bearer ${token}`}
            })
            set({ user: response.data.data.user })
        } catch (error) {
            console.log(error)
        }   
    },
    userLogout: () => {
        set(() => ({
            user: null
        }))
    }
})

// const createUserStore = create(
//     devtools(userStore)
// )

const createUserStore = create(
    devtools(
        persist(userStore, {
            name: "User",
        })
    )
)


export default createUserStore;