// creating instance of axios
import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

// get method
export const getPost = () => {
    return api.get("/posts")
};

// delete method
export const deletePost = (id) => {
    return api.delete("/posts/" + id)
}

// post method
export const postMethod = (data) => {
    return api.post("/posts", data)
}

// Update Method
export const updatePost = (id, updatedPost) => {
    return api.put(`/posts/${id}`, updatedPost)
}