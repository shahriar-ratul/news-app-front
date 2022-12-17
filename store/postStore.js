import create from 'zustand';
import axios from 'axios'
import Cookies from 'js-cookie'
import {devtools, persist} from 'zustand/middleware'


const postStore = (set) => ({
    posts: [],
    fetchPosts: async ({param}) => {
        try {
        const response = await axios.get(`/api/posts`)
            set({ posts: response.data.data.items.articles })
        } catch (error) {
            console.log(error)
        }   
    },
})


const createPostStore = create(
    devtools(
        persist(postStore, {
            name: "post",
        })
    )
)


export default createPostStore;