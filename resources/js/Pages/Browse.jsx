import React, { useState } from "react";
import PostCard from "@/Components/PostCard";
import UserButton from "@/Components/UserButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Browse({ auth, users, formattedPosts }) {
    const [searchTerm, setSearchTerm] = useState("");
    const usersArray = Array.isArray(users) ? users : [users];

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
                                        onClick={() =>
                                            fetchUserInfo(user.email)
                                        }
                                    ></UserButton>
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
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
