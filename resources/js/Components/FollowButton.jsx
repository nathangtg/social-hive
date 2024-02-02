import React, { useState } from "react";

const FollowButton = ({ userId, isFollowing, onFollow, onUnfollow }) => {
    const [following, setFollowing] = useState(isFollowing);

    const handleFollow = async () => {
        try {
            const action = following ? "unfollow" : "follow";
            const url = `http://127.0.0.1:8000/user/${action}/${userId}`;
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(`Server returned an error: ${errorMessage}`);
                throw new Error(`Server returned an error: ${errorMessage}`);
            }

            setFollowing(!following);
            following ? onUnfollow() : onFollow();
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <button
            className={`justify-center inline-flex items-center px-4 py-2 border rounded-md font-semibold text-xs uppercase tracking-widest transition ease-in-out duration-150 ${
                following
                    ? "bg-white text-black border-black hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400"
                    : "bg-gray-800 text-white border-transparent hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            onClick={handleFollow}
        >
            {following ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;
