// Import necessary modules
import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi"; // Import BiSolidLike icon

// Define the PostCard component
export default function PostCard({
    post = {}, // Making post optional with default value as an empty object
    posts,
    user_profile_picture,
    setPosts,
    date_posted,
    showDeleteButton,
    onLike,
    onDelete,
}) {
    const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser);
    const [likeCount, setLikeCount] = useState(post.likeCount);

    // Function to handle like click
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

    // Function to handle post deletion
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

    // JSX rendering
    return (
        <div
            className={` max-w-sm rounded overflow-hidden shadow-lg my-4 bg-white ${
                !post ? "h-64" : ""
            }`}
        >
            {post && post.user_name && (
                <div className="font-bold text-xl mb-2 flex items-center pt-2 px-4">
                    {post.user_profile_picture && (
                        <img
                            src={post.user_profile_picture}
                            alt="Profile"
                            className="w-12 h-12 rounded-full mr-2"
                        />
                    )}
                    {post.user_name}
                </div>
            )}

            {post && post.image && (
                <img className="w-full" src={post.image} alt="Post" />
            )}
            <div className="px-6 py-4">
                <div className="flex mb-2">
                    {post && post.user_name && (
                        <div className="">
                            <p className="font-bold text-xl mr-2">
                                {post.user_name}
                            </p>
                            <p className="text-gray-700 text-base">
                                {post.captions}
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex">
                    {showDeleteButton && (
                        <FaTrash
                            className="pt-1"
                            size={24}
                            onClick={() => handleDeletePost(post.post_id)}
                        >
                            Delete Post
                        </FaTrash>
                    )}
                    {/* Conditionally render the appropriate icon */}
                    <div className="inline-block">
                        {isLiked ? (
                            <BiSolidLike
                                className="pl-2"
                                size={28}
                                onClick={handleLikeClick}
                            />
                        ) : (
                            <AiOutlineLike
                                className="pl-2"
                                size={28}
                                onClick={handleLikeClick}
                            />
                        )}
                    </div>
                    <p className="pt-[0.3vh] pl-[0.4vw]">{likeCount}</p>
                </div>
                {/* Render the date posted below the icons */}
                {date_posted && (
                    <p className="text-sm text-gray-500 mt-2">
                        {new Date(date_posted).toLocaleDateString()}
                    </p>
                )}
            </div>
        </div>
    );
}
