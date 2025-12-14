import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const baseApi = "https://jsonplaceholder.typicode.com/posts"
const api = `${baseApi}?_limit=3`
export interface Post {
    userId: number
    id: number
    title: string
    body: string
}

interface PostState {
    status: "loading" | "success" | "error"
    error: string | null
    postData: Post[]
}

const initialState: PostState = {
    status: "loading",
    error: null,
    postData: [],
}



export const getAllPosts = createAsyncThunk<Post[], void>('postData/getAllPosts', async () => {
    const response = await axios.get<Post[]>(api)
    return response.data
})

export const createPosts = createAsyncThunk<Post, { title: string; body: string }>('postData/createPosts', async ({ title, body }) => {
    const response = await axios.post<Post>(baseApi, { title, body, userId: 1 })
    return response.data
})
export const deletePosts = createAsyncThunk<number, { id: number }>('postData/deletePosts', async ({ id }) => {
    await axios.delete(`${baseApi}/${id}`)
    return id
})
export const updatePosts = createAsyncThunk<Post, { id: number; title: string; body: string }>('postData/updatePosts', async ({ id, title, body }) => {
    const response = await axios.put<Post>(`${baseApi}/${id}`, {
        id,
        title,
        body,
        userId: 1,
    });
    return response.data
})

export const postSlice = createSlice({
    name: 'postData',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getAllPosts.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.status = 'success'
            state.postData = action.payload
        })
        builder.addCase(getAllPosts.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message || 'Something went wrong'
        })


        builder.addCase(createPosts.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(createPosts.fulfilled, (state, action) => {
            console.log(action)
            state.status = 'success'
            state.postData = [...state.postData, action.payload]
        })
        builder.addCase(createPosts.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message || 'Something went wrong'
        })


        builder.addCase(deletePosts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(deletePosts.fulfilled, (state, action) => {
            state.status = 'success';
            state.postData = state.postData.filter((post) => post.id !== action.payload);
        });
        builder.addCase(deletePosts.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message || 'Something went wrong';
        });

        builder.addCase(updatePosts.fulfilled, (state, action) => {
            state.status = "success";
            state.postData = state.postData.map((post) =>
                post.id === action.payload.id ? action.payload : post
            );
        });

    }
})


export default postSlice.reducer

