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
                    'url("https://static.vecteezy.com/system/resources/previews/007/238/606/large_2x/circles-geometry-gradient-background-with-yellow-and-orange-color-combination-presentation-background-design-suitable-for-presentation-poster-wallpaper-personal-website-ui-and-ux-experiences-free-photo.jpg")',
                backgroundSize: "cover", // Cover the entire page
                backgroundPosition: "center", // Center the background image
            }}
        >
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-yellowy shadow-md overflow-hidden sm:rounded-lg">
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
