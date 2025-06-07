import React, { useEffect, useState } from 'react'
import { postMethod, updatePost } from '../API/PostAPI'

function Form({ data, setData, updateData, setUpdateData }) {

    const [post, setPost] = useState({
        title: '',
        body: '',
    })

    let isActive = Object.keys(updateData).length === 0;

    // how to know which field is being used
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setPost({
            ...post,
            [name]: value,
        })
    }

    // updating the post 
    useEffect(() => {
        updateData && setPost({
            title: updateData.title || "",
            body: updateData.body || ""
        })
    }, [updateData])



    const handlePost = async () => {
        try {
            const updatedRes = await postMethod(post);
            console.log('Response:', updatedRes);

            const newPost = {
                ...post, // user input title/body
                id: `${Date.now()}-${Math.random()}`, // force unique id (don't trust backend id)
            };

            setData([...data, newPost]);
            setPost({ title: '', body: '' }); // Reset form
        } catch (error) {
            console.log(error);
        }
    };

    // Editing Post
    const handleEdit = async () => {
        try {
            const res = await updatePost(updateData.id, post)
            console.log(res);
            setData((prev) => {
                return prev.map((currEle) => {
                    return currEle.id === res.data.id ? res.data : currEle
                })
            })

            // Rest form
            setPost({ title: '', body: '' });
            setUpdateData({});

        } catch (error) {
            console.log(error);
        }
    }

    const handlSubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if (action === "Add") {
            handlePost()
        } else if (action === "Edit") {
            handleEdit();
        }

    }

    return (
        <form onSubmit={handlSubmit}>
            {/* Title */}
            <div>
                <label htmlFor="title"></label>
                <input type="text"
                    id='title'
                    name='title'
                    value={post.title}
                    onChange={handleOnChange}
                    placeholder='Title' />
            </div>

            {/* Body */}
            <div>
                <label htmlFor="body"></label>
                <input type="text"
                    id='body'
                    name='body'
                    value={post.body}
                    onChange={handleOnChange}
                    placeholder='Body' />
            </div>

            <button type='submit'
                value={isActive ? "Add" : "Edit"}
            >
                {isActive ? "Add" : "Edit"}
            </button>
        </form>
    )
}

export default Form
