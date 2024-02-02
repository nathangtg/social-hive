import React from "react";

export default function PostCard({ post }) {
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
            </div>
        </div>
    );
}
