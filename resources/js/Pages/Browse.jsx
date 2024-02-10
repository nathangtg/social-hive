import React, { useState } from "react";
import PostCard from "@/Components/PostCard";
import UserButton from "@/Components/UserButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Browse({ auth, users, formattedPosts }) {
    console.log(users);
    console.log(formattedPosts);

    const [searchTerm, setSearchTerm] = useState("");
    const [posts, setPosts] = useState(formattedPosts);

    const usersArray = Array.isArray(users) ? users : [users];

    const handleLike = async (post_id) => {
        // First, optimistically update the UI to reflect the like/unlike action
        setPosts((currentPosts) =>
            currentPosts.map((post) => {
                if (post.post_id === post_id) {
                    return {
                        ...post,
                        // Toggle the isLikedByCurrentUser state
                        isLikedByCurrentUser: !post.isLikedByCurrentUser,
                        // Adjust the like count based on the new isLikedByCurrentUser state
                        likes: post.isLikedByCurrentUser
                            ? post.likes - 1
                            : post.likes + 1,
                    };
                }
                return post;
            })
        );

        try {
            const url = `http://127.0.0.1:8000/post/like/${post_id}`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });

            if (!response.ok) {
                throw new Error("Failed to like the post.");
                // If the request fails, revert the optimistic UI update
                // Note: This reversion might need to be adjusted based on the actual error handling strategy
            }
            // Consider handling the response data here, if needed
        } catch (error) {
            console.error("Error:", error);
            // Revert the optimistic update in case of an error
            setPosts((currentPosts) =>
                currentPosts.map((post) => {
                    if (post.post_id === post_id) {
                        return {
                            ...post,
                            isLikedByCurrentUser: !post.isLikedByCurrentUser,
                            likes: post.isLikedByCurrentUser
                                ? post.likes + 1
                                : post.likes - 1,
                        };
                    }
                    return post;
                })
            );
        }
    };

    function fetchUserInfo(email) {
        fetch("/api/profile/info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Include CSRF token and any other needed headers
            },
            body: JSON.stringify({ email: email }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Do something with the user info
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = searchTerm
        ? usersArray.filter(
              (user) =>
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : usersArray;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Browse
                </h2>
            }
        >
            <Head title="Browse" />
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="self-center mt-6">
                        <h2 className="self-center justify-center flex">
                            Browse Users
                        </h2>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="p-2 border rounded-md self-center"
                        />
                    </div>
                    <ul>
                        {filteredUsers.map((user, index) => {
                            if (!user.id) {
                                console.warn("User without ID found:", user);
                                return null; // Skip rendering this user
                            }
                            return (
                                <div
                                    className="bg-white md:w-[100vh] p-4 rounded-md m-4 w-[50vh] justify-center self-center"
                                    key={user.id}
                                >
                                    <UserButton
                                        email={user.email}
                                        name={user.name}
                                        image={
                                            user.profile_picture_path
                                                ? `http://127.0.0.1:8000/storage${user.profile_picture_path.substring(
                                                      user.profile_picture_path.indexOf(
                                                          "/public"
                                                      )
                                                  )}`
                                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                        }
                                        onClick={() =>
                                            fetchUserInfo(user.email)
                                        }
                                    />
                                </div>
                            );
                        })}
                    </ul>
                    <div className="flex flex-col">
                        <div className="self-center mt-6">
                            <h2>Browse Posts</h2>
                        </div>
                        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex flex-col self-center justify-center">
                            {formattedPosts &&
                                formattedPosts.map((formattedPost) => (
                                    <PostCard
                                        key={formattedPost.post_id}
                                        post={formattedPost}
                                        showDeleteButton={false}
                                        onLike={() =>
                                            handleLike(formattedPost.post_id)
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
