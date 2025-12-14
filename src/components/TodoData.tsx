import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import { deletePosts, getAllPosts, updatePosts } from "../redux/postSlice"

const TodoData = () => {

    const Dispatch = useAppDispatch()
    const selector = useAppSelector((state) => state.posts)
    const { postData, status, error } = selector

    const [editId, setEditId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const startEdit = (post: { id: number; title: string; body: string }) => {
        setEditId(post.id);
        setTitle(post.title)
        setBody(post.body)
    };



    const saveEdit = (id: number) => {
        Dispatch(updatePosts({ id, title, body }))
            .then(() => setEditId(null))
            .catch((err) => console.error("Update failed:", err));
    };


    useEffect(() => {
        Dispatch(getAllPosts())
    }, [Dispatch])


    const deletePost = (id: number) => {
        Dispatch(deletePosts({ id }))
            .unwrap()
            .catch((err) => {
                console.error("Delete failed:", err);
            });

    }

    const cancelEdit = () => {
        setEditId(null);
    };

    return (
        <div className="posts-container">
            {status === "loading" && <h2 className="status">Loading...</h2>}
            {status === "error" && <h2 className="status error">{error}</h2>}
            {status === "success" &&
                postData.map((post, idx) => (
                    <div className="post-card" key={idx}>
                        <div className="post-content">
                            {editId === post.id ? (
                                <>
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="form-input"
                                    />
                                    <textarea
                                        name="body"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        className="form-textarea"
                                        rows={4}
                                    />
                                </>
                            ) : (
                                <>
                                    <h2 className="post-title">{post.title}</h2>
                                    <p className="post-body">{post.body}</p>
                                </>
                            )}

                        </div>
                        <div className="post-actions">
                            {editId === post.id ? (
                                <>
                                    <button
                                        className="btn save"
                                        onClick={() => saveEdit(post.id)}
                                    >
                                        Save
                                    </button>
                                    <button className="btn cancel" onClick={cancelEdit}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="btn update"
                                    onClick={() => startEdit(post)}
                                >
                                    Update
                                </button>
                            )}

                            <button type="button" className="btn delete" onClick={() => deletePost(post.id)}>Delete</button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default TodoData
