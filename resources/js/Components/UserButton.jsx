import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

const UserButton = ({ email, name, image }) => {
    return (
        <InertiaLink
            href={`/profile_page/${email}`}
            className="flex items-center"
        >
            <img
                src={image}
                className="rounded-full h-8 w-8 object-cover mr-2"
            />
            {name}
        </InertiaLink>
    );
};

export default UserButton;
