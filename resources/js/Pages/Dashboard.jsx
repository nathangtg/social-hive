import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PostCard from "@/Components/PostCard";
import { Head } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function Dashboard({ auth, posts, user_portfolio }) {
    console.log(posts);
    console.log(user_portfolio);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 md:w-[100vh]">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className=" px-6 py-3 text-gray-900 flex items-center">
                            {/* Profile Picture */}
                            {user_portfolio &&
                                user_portfolio.profile_picture_path && (
                                    <img
                                        src={
                                            user_portfolio.profile_picture_path
                                        }
                                        alt="Profile"
                                        className="rounded-full h-12 w-12 object-cover mr-4"
                                    />
                                )}
                            {auth.user.name}
                        </div>
                        <div className="px-6 py-3 text-gray-900">
                            Welcome Back {auth.user.name}
                        </div>
                        <div className="pl-4 text-gray-900 flex flex-col">
                            <p className="py-2 px-2 md:w-[100vh] w-[20vh] text-md font-bold">
                                Location :{" "}
                                {user_portfolio && user_portfolio.country
                                    ? [
                                          user_portfolio.country,
                                          user_portfolio.state,
                                          user_portfolio.city,
                                      ].join(", ")
                                    : "You haven't set a location yet"}
                            </p>
                            <p className="font-weight-bolder text-2xl pl-2 pt-3">
                                Description :
                            </p>
                            <p className="py-0.5 px-2 md:w-120 pb-2">
                                {user_portfolio &&
                                user_portfolio.user_description
                                    ? user_portfolio.user_description
                                    : "You haven't set a description yet"}
                                !
                            </p>
                        </div>
                        {/* Render user's posts */}
                    </div>
                    <p className="text-2xl font-weight-bold mb-2 md:ml-2 ml-4 flex justify-center">
                        Your Posts :
                    </p>
                    <div className=" flex md:ml-2 justify-center self-center">
                        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 8 flex flex-col self-center">
                            {posts && posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostCard key={post.post_id} post={post} />
                                ))
                            ) : (
                                <p>
                                    You haven't made any posts, try making one
                                    here <br />{" "}
                                    <a
                                        href="/create"
                                        className="self-center justify-center flex underline"
                                    >
                                        Create Post
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
