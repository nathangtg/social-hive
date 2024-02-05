import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function CreatePost({ auth }) {
    // State variables
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [postSuccess, setPostSuccess] = useState(false); // New state for tracking post success

    // Handle caption change
    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    // Handle file change
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setPreviewUrl(URL.createObjectURL(selectedFile));
        } else {
            setPreviewUrl(null);
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("caption", caption);
        if (file) {
            formData.append("image", file);
        }

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        try {
            const response = await fetch("/create", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
            });
            if (response.ok) {
                // Set postSuccess to true to show the success message
                setPostSuccess(true);

                // Optionally, reset the form state
                setCaption("");
                setFile(null);
                setPreviewUrl(null);
            } else {
                // Handle non-successful response
                setPostSuccess(false);
            }
        } catch (error) {
            // Handle error
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Post
                </h2>
            }
        >
            <Head title="CreatePost" />

            <div className="flex justify-center m-4">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900">
                        Create a Post
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Tell your friends something new about your day, share
                        your day with the rest of the world
                    </p>

                    <form
                        className="flex flex-col mt-8"
                        onSubmit={(event) => handleSubmit(event)}
                    >
                        <label htmlFor="post_captions">Create a caption</label>
                        <p className="text-sm text-gray-600">
                            Having an appealing caption to help attract people
                            into your account
                        </p>
                        <textarea
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block w-full mb-6"
                            type="text"
                            value={caption}
                            onChange={(event) => handleCaptionChange(event)}
                            name="post_captions"
                        ></textarea>

                        <label htmlFor="post_image pt-6">Upload an image</label>
                        <p className="text-sm text-gray-600">
                            Having an appealing image to help attract people
                            into your account
                        </p>
                        <input
                            className=" border-black mt-1 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block w-full"
                            type="file"
                            onChange={(event) => handleFileChange(event)}
                            name="post_image"
                        ></input>

                        {previewUrl && (
                            <div className="mt-4 justify-center max-w-96">
                                <p className="text-sm text-gray-600">
                                    Preview:
                                </p>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-w-xs mt-2"
                                />
                                <p className="font-extrabold mt-2">
                                    {auth.user.name} :
                                </p>
                                <p className="overflow-scroll-y">{caption}</p>
                            </div>
                        )}

                        <button
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold
                                        text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition
                                        ease-in-out duration-150 false mt-8"
                        >
                            Create Post
                        </button>
                        {postSuccess && ( // Conditional rendering for the success message
                            <div className="text-center py-2 lg:px-4">
                                <div
                                    className="p-2 items-start justify-start text-green-500 leading-none lg:rounded-full flex lg:inline-flex"
                                    role="alert"
                                >
                                    <span className="font-semibold mr-2 text-left flex-auto mt-2">
                                        Post successful!
                                    </span>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
