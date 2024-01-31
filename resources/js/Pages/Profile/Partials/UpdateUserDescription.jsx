import { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileForm({ className = "" }) {
    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        user_description: "",
        // ... include other user profile fields here ...
    });

    const updateProfile = (e) => {
        e.preventDefault();

        // Use the post method provided by useForm to submit to the "portfolio.addDescription" route
        post(route("portfolio.addDescription"), {
            preserveScroll: true,
            onSuccess: () => setData("user_description", ""), // Clear the user_description field on success
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Profile
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your profile information here.
                </p>
            </header>

            <form onSubmit={updateProfile} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="user_description"
                        value="Description"
                    />

                    <textarea
                        id="user_description"
                        value={data.user_description}
                        onChange={(e) =>
                            setData("user_description", e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />

                    <InputError
                        message={errors.user_description}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
