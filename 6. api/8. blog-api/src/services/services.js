import posts from "../data/posts.js";

export const getAllPosts = () => {
    return posts;
}

export const getPostById = (id) => {
    return posts.find((post) => post.id === id);
}

export const createPost = (post) => {
    const newPost = {
        id: posts.length + 1,
        title: post.title,
        content: post.content,
        author: post.author || "Anonymous",
        date: new Date().toISOString(),
    };

    posts.push(newPost);

    return newPost;
}

export const updatePostById = (id, patch) => {
    const target = posts.find((post) => post.id === id);

    if (patch.title) target.title = patch.title;
    if (patch.content) target.content = patch.content;
    if (patch.author) target.author = patch.author;

    return target;
}

export const deletePostById = (id) => {
    const targetPost = posts.findIndex((post) => post.id === id);

    if (targetPost === -1) {
        return false;
    }
    
    return posts.splice(targetPost, 1);
}

export const deleteAllPosts = () => {
    if (!posts) {
        return false;
    }

    posts.length = 0;
    return true;
}