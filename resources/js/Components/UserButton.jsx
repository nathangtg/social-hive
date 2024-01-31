import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

const UserButton = ({ email, name }) => {
    return <InertiaLink href={`/profile_page/${email}`}>{name}</InertiaLink>;
};

export default UserButton;
