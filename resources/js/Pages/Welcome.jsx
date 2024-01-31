import { Link, Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    useEffect(() => {
        document.title = "Social Hive";
        document.body.style.backgroundColor = "#f5d0a9";
        document.body.style.backgroundSize = "cover";
    });

    return (
        <>
            <Head title="Welcome" />
            <div className="flex justify-center py-2">
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="font-semibold text-gray-600 hover:text-brown dark:text-gray-400 dark:hover:text-amber-800 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Log in
                        </Link>

                        <Link
                            href={route("register")}
                            className="ms-4 font-semibold text-gray-600 hover:text-amber-800 dark:text-gray-400 dark:hover:text-amber-800 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
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
