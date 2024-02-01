import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PostCard from "@/Components/PostCard";
import { Head } from "@inertiajs/react";
import FollowButton from "@/Components/FollowButton";
import { useState } from "react";

export default function Dashboard({
    auth,
    posts,
    user_portfolio,
    profileUser,
}) {
    console.log(posts);
    console.log(user_portfolio);
    console.log(profileUser);

    const [isFollowing, setIsFollowing] = useState(false); // Initialize isFollowing state

    const handleSubmit = async (userId) => {
        try {
            const url = `http://127.0.0.1:8000/user/${
                isFollowing ? "unfollow" : "follow"
            }/${userId}`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("There was an error processing your request.");
            }

            setIsFollowing(!isFollowing); // Toggle the following state
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={
                                profileUser.profile_picture_path
                                    ? `http://127.0.0.1:8000/storage${profileUser.profile_picture_path.substring(
                                          profileUser.profile_picture_path.indexOf(
                                              "/public"
                                          )
                                      )}`
                                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            }
                            style={{
                                height: "7vh",
                                marginRight: "10px",
                                borderRadius: "50%",
                            }}
                            alt="Profile Picture"
                        />
                        {profileUser.name}'s Profile
                    </div>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 md:w-[100vh]">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4">
                        <div className="p-6 text-gray-900 flex flex-col">
                            <p>Email: {profileUser.email}</p>
                            <p className="py-2 pr-2 md:w-120 text-md font-bold">
                                Location :{" "}
                                {user_portfolio && user_portfolio.country
                                    ? [
                                          user_portfolio.country,
                                          user_portfolio.state,
                                          user_portfolio.city,
                                      ].join(", ")
                                    : "This user hasn't set a location yet"}
                            </p>
                            <FollowButton
                                userId={profileUser.id}
                                onSubmit={handleSubmit}
                                isFollowing={isFollowing} // Pass isFollowing as a prop
                                onFollow={() => setIsFollowing(true)} // Callback to update isFollowing
                                onUnfollow={() => setIsFollowing(false)} // Callback to update isFollowing
                            ></FollowButton>
                        </div>

                        <div className="pl-6 text-gray-900 flex flex-col">
                            <p className="font-weight-bolder text-2xl">
                                Description :
                            </p>
                            <p className="py-2">
                                {user_portfolio
                                    ? user_portfolio.user_description
                                    : "This user hasn't set a description yet"}
                            </p>
                        </div>
                        {/* Render user's posts */}
                    </div>
                    <p className="text-2xl font-weight-bold mb-2 md:ml-2 ml-4 flex justify-center pt-4 md:pt-6">
                        Posts by {profileUser.name}
                    </p>
                    <div className=" flex md:ml-2 justify-center self-center">
                        <div className="flex flex-col">
                            {posts && posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostCard key={post.post_id} post={post} />
                                ))
                            ) : (
                                <p className="text-center">
                                    No posts available.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
