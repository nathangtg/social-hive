import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PostCard from "@/Components/PostCard";
import { Head } from "@inertiajs/react";
import FollowButton from "@/Components/FollowButton";
import { useState } from "react";
import ChatButton from "@/Components/ChatButton";

export default function ProfilePage({
    auth,
    posts,
    user_portfolio,
    profileUser,
    followStatus,
    followersAmount,
}) {
    const [localPosts, setLocalPosts] = useState(posts);
    const [isFollowing, setIsFollowing] = useState(followStatus);
    const isOwnProfile = auth.user.id === profileUser.id;

    const handleLike = async (post_id) => {
        const updatedPosts = localPosts.map((post) => {
            if (post.post_id === post_id) {
                const updatedLikeStatus = !post.isLikedByCurrentUser;
                return {
                    ...post,
                    isLikedByCurrentUser: updatedLikeStatus,
                    likes: updatedLikeStatus
                        ? post.likes + 1
                        : Math.max(0, post.likes - 1),
                };
            }
            return post;
        });

        setLocalPosts(updatedPosts);

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/post/like/${post_id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to like the post.");
            }
            // Assuming no need to update local state based on the response since it's optimistic
        } catch (error) {
            console.error("Error:", error);
            // Revert optimistic update if server update fails
            setLocalPosts(localPosts); // Consider deeper clone or better revert strategy
        }
    };

    const handleSubmit = async (userId) => {
        const action = followStatus ? "Unfollow" : "Follow";
        try {
            const url = `http://127.0.0.1:8000/user/${action}/${userId}`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify({ userId }), // Ensure you have the correct payload here
            });

            if (!response.ok) {
                throw new Error("There was an error processing your request.");
            }

            // Get the updated status from the server response
            const data = await response.json();
            if (data.isFollowing !== undefined) {
                setIsFollowing(data.isFollowing);
            } else {
                // Fallback to toggling if the server doesn't respond with a status
                setIsFollowing(!isFollowing);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // ! DEBUGGING PURPOSES
    console.log(profileUser);
    console.log(followStatus);
    console.log(posts);
    // ! DO NOT TOUCH

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
                            <p className="py-0.5 pr-2 md:w-120 text-md font-bold">
                                Location :{" "}
                                {user_portfolio && user_portfolio.country
                                    ? [
                                          user_portfolio.country,
                                          user_portfolio.state,
                                          user_portfolio.city,
                                      ].join(", ")
                                    : "This user hasn't set a location yet"}
                            </p>
                            <p>
                                <span className=" font-bold">Followers : </span>
                                {followersAmount}
                            </p>
                            {isOwnProfile ? (
                                <p
                                    className="text-center font-semibold bg-white
                                 text-black border-black hover:bg-gray-300
                                 focus:bg-gray-300 active:bg-gray-400
                                 justify-center
                                 inline-flex items-center px-4 py-2 border rounded-md text-xs
                                 uppercase tracking-widest transition ease-in-out duration-150 "
                                >
                                    Your own account
                                </p>
                            ) : (
                                <>
                                    <FollowButton
                                        userId={profileUser.id}
                                        onSubmit={handleSubmit}
                                        isFollowing={isFollowing}
                                        onFollow={() => setIsFollowing(true)}
                                        onUnfollow={() => setIsFollowing(false)}
                                    />

                                    <ChatButton targetUser={profileUser.id} />
                                </>
                            )}
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
                                    <PostCard
                                        key={post.post_id}
                                        post={post}
                                        showDeleteButton={false}
                                        onLike={() => handleLike(post.post_id)}
                                    />
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
