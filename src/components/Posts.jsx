import React from 'react'
import { useEffect, useState } from 'react'
import { getPost, deletePost } from '../API/PostAPI'
import Loader from './Loader/Loader'
import Form from './Form'
import '../app.css'

function Posts() {
    const [data, setData] = useState([])
    const [updateData, setUpdateData] = useState({})
    const [loading, setLoading] = useState(true);

    // Function to get post
    const getPostMethod = () => {
        setTimeout(async () => {
            const res = await getPost();
            setLoading(false);
            console.log(res.data);
            setData(res.data);
        }, 999);

    }

    // Function to delte post
    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id);
            if (res.status === 200) {
                const updatedPosts = data.filter((currPost) => {
                    return currPost.id !== id
                })
                setData(updatedPosts)
            }
            else {
                console.log("failed to delete post status", res.status);

            }
        } catch (error) {
            console.log(error);
        }

    }

    // Function to Edit Post
    const handleUpdatePost = (currEle) => setUpdateData(currEle);

    useEffect(() => {
        getPostMethod()
    }, [])

    return (
        <>
            <h1>React Crud Operation</h1>
            <section className='section-form'>
                <Form
                    data={data}
                    setData={setData}
                    updateData={updateData}
                    setUpdateData={setUpdateData}
                />
            </section>

            <section className='section-body'>
                {loading ? <Loader /> :
                    <ol className='section-ol'>
                        {
                            data.map((currEle) => {
                                const { id, title, body } = currEle;
                                return (
                                    < li key={id} >
                                        <p className='title'>Title: {title}</p>
                                        <p className='data'>Data: {body}</p>
                                        <button className='btn-edt'
                                            onClick={() => handleUpdatePost(currEle)}
                                        >Edit</button>
                                        <button className='btn-del'
                                            onClick={() => handleDeletePost(id)}
                                        >Delete</button>
                                    </li>
                                )
                            })
                        }
                    </ol>
                }

            </section >
        </>
    )
}

export default Posts


// -----------------------------------------------------------------------------------------
// 😣 Alternative (longer) method — passing only id
// jsx
// Copy
// Edit
// <button onClick={() => handleUpdatePost(id)}>Edit</button>

// // In function
// const handleUpdatePost = (id) => {
//     // You need to manually search for the object
//     const postToUpdate = data.find(post => post.id === id);

//     if (postToUpdate) {
//         setUpdateData(postToUpdate);
//     } else {
//         console.error("Post not found!");
//     }
// };