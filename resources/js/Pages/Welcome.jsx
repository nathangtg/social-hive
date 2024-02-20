import { Link, Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    useEffect(() => {
        document.title = "Social Hive";
    });

    return (
        <>
            <Head title="Welcome" />

            {/* PAGE START */}
            <div className="flex flex-col">
                {/* SECTION 1 */}
                <div className="bg-black">
                    <div className="flex justify-center">
                        <div className="flex flex-col items-center font-sans w-full p-4">
                            <p className="sm:text-[7vh] lg:text-[15vh] md:text-[20vh] text-[7vh] text-orange font-oi font-light mb-2">
                                WELCOME!
                            </p>
                            <div className="flex">
                                <p className="text-md text-orange text-center font-archivo text-bold">
                                    Socialise, Connect, Know more
                                </p>
                            </div>
                            <img
                                className="rounded-lg my-6"
                                src="https://framerusercontent.com/images/K8LWZQw7Zo5ET9QcB44iYHNpA.jpg"
                                alt="Skyy"
                            />
                        </div>
                    </div>
                </div>
                {/* SECTIONN 2 */}
                <div className="bg-bluey flex flex-col md:flex-row md:justify-center p-6 md:w-[100%] md:h-[40vh] md:px-[20vh]">
                    <div className="flex flex-col md:w-1/2 md:justify-center my-4">
                        <p className="font-oi text-3xl md:text-5xl my-2 md:self-center flex">
                            Stand Out
                        </p>
                    </div>

                    <div className="flex flex-col md:w-1/2 md:justify-center md:pr-[4vh] text-justify">
                        <p className="font-archivo text-xl self-center text-white">
                            Ever dreamt to make a difference with your words? On
                            Social Hive, your buzz spreads rapidly carrying your
                            unique essence. Let’s bring the fun back in
                            opinions!
                        </p>
                    </div>
                </div>
                {/* SECTION 3 */}
                <div className="flex flex-col md:flex-row md:px-[10vh] bg-yellowy justify-center px-4 pb-[10vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-[4vh]">
                        {/* First Item */}
                        <div className="flex flex-col justify-center text-justify">
                            <img
                                className="rounded-lg my-6 w-full h-[50vh] object-cover"
                                src="https://framerusercontent.com/images/I4lMS02jqg4PtJmetzyYURwE38Q.jpg?scale-down-to=512"
                                alt="picture 1"
                            />
                            <p className="font-oi text-[5vh]">
                                Interact Globally
                            </p>
                            <p className="text-archivo text-[3vh]">
                                Post and connect with individuals from around
                                the globe
                            </p>
                        </div>

                        {/* Second Item */}
                        <div className="flex flex-col justify-center text-justify">
                            <img
                                className="rounded-lg my-6 w-full h-[50vh] object-cover"
                                src="https://framerusercontent.com/images/avdm6Mf4bi6l2beL5aSBEBS6M.jpg?scale-down-to=512"
                                alt="picture 2"
                            />
                            <p className="font-oi text-[5vh]">
                                Opinions Matter
                            </p>
                            <p className="text-archivo text-[3vh]">
                                Every buzz contributes to the global
                                conversation
                            </p>
                        </div>

                        {/* Third Item */}
                        <div className="flex flex-col justify-center text-justify">
                            <img
                                className="rounded-lg my-6 w-full h-[50vh] object-cover"
                                src="https://framerusercontent.com/images/lgwnA6xWcI5j6XUYYXCZ3TnI5E.jpg?scale-down-to=512"
                                alt="picture 3"
                            />
                            <p className="font-oi text-[5vh]">
                                Break Boundaries
                            </p>
                            <p className="text-archivo text-[3vh]">
                                No barriers in this hive. Skip across countries
                                with a single click.
                            </p>
                        </div>

                        {/* Fourth Item */}
                        <div className="flex flex-col justify-center text-justify">
                            <img
                                className="rounded-lg my-6 w-full h-[50vh] object-cover"
                                src="https://framerusercontent.com/images/3KtYtvXry2qqUVkE8PQU0cTREu8.jpg?scale-down-to=512"
                                alt="picture 4"
                            />
                            <p className="font-oi text-[5vh]">Urban Vibe</p>
                            <p className="text-archivo text-[3vh]">
                                Experience the whirlwind of thoughts in our city
                                of minds.
                            </p>
                        </div>
                    </div>
                </div>

                {/* SECTION 4 */}
                <div>
                    <div className="relative bg-hero-pattern w-full h-full bg-cover p-[20vh] py-[40vh]">
                        <div className=""></div>
                        <div className="flex justify-center items-center w-full h-full">
                            <p className="font-oi text-[5vh] text-white md:text-blue-900 text-center">
                                “Like bees in a hive, we must function together
                                to create a better world, one post at a time”
                            </p>
                        </div>
                    </div>
                </div>

                {/* SECTION 5 */}
                <div className="flex flex-col bg-yellowy md:px-[30vh] justify-center items-center py-4 px-1vh">
                    {/* CONTENT 1 */}
                    <div className="flex flex-col md:flex-row bg-yellowy py-2 md:py-0 w-full max-w-screen-md px-[2vh]">
                        <div className="flex flex-col md:w-1/2 md:self-center justify-center">
                            <p className="font-oi text-3xl md:text-justify">
                                Buzz Around
                            </p>
                            <p className="font-archivo text-xl  md:text-justify">
                                Experience the thrill of fleeting moments in
                                real-time. Use the power of Words, Memes, or
                                Animated GIFs to express what’s buzzing in your
                                mind
                            </p>
                        </div>
                        <div className="flex md:w-1/2 w-full md:pl-4 justify-center">
                            <img
                                className="rounded-lg my-6 w-full h-[50vh] object-cover md:pr-4"
                                src="https://framerusercontent.com/images/FMvQIQ4cJ81UHaTFa4bodTcD8Y.jpg?scale-down-to=512"
                                alt="Buzz Around"
                            />
                        </div>
                    </div>

                    {/* CONTENT 2 */}
                    <div className="flex flex-col md:flex-row bg-yellowy py-2 md:py-0 w-full max-w-screen-md px-[2vh]">
                        <div className="flex md:w-1/2 md:pl-4 justify-center">
                            <img
                                className="rounded-lg my-6 w-full h-[50vh] object-cover md:pr-4"
                                src="https://framerusercontent.com/images/uTs3tUebDMoWrGRkMiw2ljMZs.jpg?scale-down-to=512"
                                alt="Join the Hive"
                            />
                        </div>
                        <div className="flex flex-col md:w-1/2 md:self-center justify-center">
                            <p className="font-oi text-3xl  md:text-justify">
                                Join the Hive
                            </p>
                            <p className="font-archivo text-xl  md:text-justify">
                                Find your crew. Follow people who vibe with you
                                and create your own unique hive.
                            </p>
                        </div>
                    </div>

                    {/* CONTENT 3 */}
                    <div className="flex flex-col bg-yellowy py-2 md:py-0 w-full max-w-screen-md justify-center items-center my-12 px-[2vh]">
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-oi text-2xl">Get Started</p>
                            <p className="font-archivo text-xl text-center">
                                Ready to start buzzing? Why wait, start your
                                journey with Social Hive today!
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center py-3">
                            <Link
                                href="/register"
                                className="bg-black text-blue-300 font-bold py-2 px-4 rounded md:mr-2 my-1 transition duration-300 border border-transparent hover:border-blue-700 hover:bg-blue-700 hover:text-white"
                            >
                                Create an account
                            </Link>
                            <Link
                                href="/login"
                                className="bg-orange text-black font-bold py-2 px-4 rounded md:ml-2 my-1 transition duration-300 border border-transparent hover:border-blue-700 hover:bg-blue-700 hover:text-white"
                            >
                                Member ? Login !
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* PAGE END */}
        </>
    );
}
