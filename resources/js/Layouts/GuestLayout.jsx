import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";

export default function Guest({ children }) {
    return (
        <div
            className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 scroll-m-4"
            style={{
                backgroundClip: "border-box",
                backgroundImage:
                    'url("https://files.oaiusercontent.com/file-295HTfKYCtH6DyNpIHgdt4dn?se=2024-02-03T13%3A31%3A34Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D6015f888-b4e2-46cb-bfed-1c100adca0ef.webp&sig=DFxDGJlI6S8NdH5pD/qyxJgV6gBm7l/Qf4cxgCCVg8c%3D")',
                backgroundSize: "cover", // Cover the entire page
                backgroundPosition: "center", // Center the background image
            }}
        >
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 backdrop-blur-sm shadow-md overflow-hidden sm:rounded-lg">
                <div className="self-center flex justify-center">
                    <Link href="/">
                        {/* <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" /> */}
                        <img
                            className="w-20 h-20 fill-current text-gray-500"
                            src="https://i.ibb.co/NZPLHf3/Social-Hive-transformed.png"
                        ></img>
                        <p>Social Hive</p>
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
