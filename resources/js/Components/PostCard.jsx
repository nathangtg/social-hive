import React from "react";

export default function PostCard({ post, posts, setPosts }) {
    const handleDeletePost = async (post_id) => {
        if (!confirm("Are you sure you want to delete this post?")) {
            return;
        }

        try {
            const url = `http://127.0.0.1:8000/post/${post_id}`;
            const response = await fetch(url, {
                method: "DELETE", // Make sure to use the DELETE HTTP method
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete the post.");
            }

            // Remove the post from the UI
            const updatedPosts = posts.filter(
                (post) => post.post_id !== post_id
            );
            setPosts(updatedPosts); // Assuming you have a state called `posts` that holds the list
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg my-2">
            {post.image && (
                <img className="w-full" src={post.image} alt="Post" />
            )}
            <div className="px-6 py-4">
                {post.user_id && (
                    <div className="font-bold text-xl mb-2">
                        {post.user_name}
                    </div>
                )}
                {post.user_id && (
                    <p className="text-gray-700 text-base">{post.captions}</p>
                )}
                <button onClick={() => handleDeletePost(post.post_id)}>
                    Delete Post
                </button>
            </div>
        </div>
    );
}
