import { useState, type ChangeEvent } from "react"
import TodoData from "./TodoData"
import { useAppDispatch } from "../redux/hook"
import { createPosts } from "../redux/postSlice"

export interface todoListsType {
    title: string
    body: string
}
const InputSearch = () => {
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleForm = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createPosts({ title, body }))
        setTitle('')
        setBody('')
    }

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleForm} className="todo-form">
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="form-input"
                    />
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}

                        name="body"
                        placeholder="Enter description"
                        className="form-textarea"
                        rows={4}
                    />

                    <button className="btn">Add</button>
                </form>
            </div>
            <TodoData />
        </>
    )
}

export default InputSearch














