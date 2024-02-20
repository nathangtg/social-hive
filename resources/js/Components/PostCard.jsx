import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi"; // Import BiSolidLike icon

export default function PostCard({
    post,
    posts,
    setPosts,
    showDeleteButton,
    onLike,
    onDelete,
}) {
    const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser);
    const [likeCount, setLikeCount] = useState(post.likeCount);

    const handleLikeClick = async () => {
        const newIsLiked = !isLiked;
        // Optimistically update UI
        setIsLiked(newIsLiked);
        setLikeCount((prev) => (newIsLiked ? prev + 1 : Math.max(0, prev - 1))); // Prevent negative count

        try {
            // Send like/unlike action to the server
            await onLike(post.post_id);
            // If necessary, here you can handle the server's response to confirm the action
        } catch (error) {
            // If there's an error, revert the optimistic update
            setIsLiked(isLiked);
            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            console.error("Failed to update like status:", error);
        }
    };

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
                {post.user_name && (
                    <div className="font-bold text-xl mb-2">
                        {post.user_name}
                    </div>
                )}
                <p className="text-gray-700 text-base">{post.captions}</p>
                <div className="flex pt-2">
                    {showDeleteButton && (
                        <FaTrash
                            className="pt-1"
                            size={24}
                            // className="px-4 py-2 my-1 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded focus:outline-none focus:shadow-outline transform transition-colors duration-150 ease-in-out"
                            onClick={() => onDelete(post.post_id)}
                        >
                            Delete Post
                        </FaTrash>
                    )}
                    {/* Conditionally render the appropriate icon */}
                    <div className=" inline-block">
                        {isLiked ? (
                            <BiSolidLike
                                className="pl-2"
                                size={28}
                                onClick={handleLikeClick}
                            ></BiSolidLike>
                        ) : (
                            <AiOutlineLike
                                className="pl-2"
                                size={28}
                                onClick={handleLikeClick}
                            ></AiOutlineLike>
                        )}
                    </div>
                    <p className="pt-[0.3vh] pl-[0.4vw]">{likeCount}</p>
                </div>
            </div>
        </div>
    );
}
