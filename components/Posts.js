import React, { useEffect, useState } from 'react'
import Post from './Post'
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

// import { useContext } from 'react'
// import { ModalContext } from '../context/modalContext'



function Posts() {
    const [posts, setPosts] = useState([]);
    // const { opening } = useContext(ModalContext);

    useEffect(() => {

        const colRef = collection(db, 'posts');

        const fetchPosts = onSnapshot(query(colRef, orderBy('createdAt', 'desc')), (snapshot) => {
            // const postsArr = [];

            
            // snapshot.docs.forEach((doc) => {
            //     console.log(doc.id);
            //     postsArr.push(doc);
            // });
    
            setPosts(snapshot.docs);

        })


        return () => fetchPosts();

    }, [db]);

    console.log(posts);


    return (
        <div>
            {posts.map((post, id) => (
                <Post key = {id} post = {post.data()} id = {post.id}></Post>
            ))}
        </div>

        // <div>dasasfsaf</div>
    ) 
}

export default Posts