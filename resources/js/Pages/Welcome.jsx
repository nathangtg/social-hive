import { Link, Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    useEffect(() => {
        document.title = "Social Hive";
        document.body.style.backgroundImage = `url("https://files.oaiusercontent.com/file-295HTfKYCtH6DyNpIHgdt4dn?se=2024-02-03T13%3A31%3A34Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D6015f888-b4e2-46cb-bfed-1c100adca0ef.webp&sig=DFxDGJlI6S8NdH5pD/qyxJgV6gBm7l/Qf4cxgCCVg8c%3D")`;
        document.body.style.backgroundSize = "cover";
    });

    return (
        <>
            <Head title="Welcome" />
            <div className="flex justify-center py-2">
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="font-semibold text-gray-600 hover:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="font-semibold text-orange-900 hover:text-brown  dark:hover:text-amber-800 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Log in
                        </Link>

                        <Link
                            href={route("register")}
                            className="ms-4 font-semibold text-orange-900 hover:text-amber-800 dark:hover:text-amber-800 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
            <div className="h-[100vh] justify-center flex flex-col">
                <div className="flex justify-center flex-col px-4 backdrop-blur-sm w-fit p-12 rounded-lg w-50% border border-gray-500">
                    <img
                        className="w-40 h-40 fill-current text-gray-500 self-center"
                        src="https://i.ibb.co/NZPLHf3/Social-Hive-transformed.png"
                    ></img>
                    <p className="text-4xl text-bold font-sans self-center mb-2">
                        Social Hive
                    </p>

                    <p className="text-center self-center md:px-14">
                        At Social Hive, we believe in the power of connection.
                        In a world where opportunities are boundless, but often
                        hard to find, we provide a dynamic platform that bridges
                        the gap between talent and opportunity. Our vision is to
                        create a vibrant community where professionals can
                        showcase their portfolios, discover potential
                        collaborations, and connect with peers and organizations
                        worldwide. Whether you're a seasoned professional or
                        just starting, Social Hive offers an inclusive space to
                        highlight your skills, expand your network, and pave the
                        way for your next big opportunity. We're not just a
                        platform; we're a catalyst for professional growth and
                        innovation.{" "}
                    </p>
                </div>
            </div>
        </>
    );
}
