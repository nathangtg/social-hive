import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "Inter Placeholder", "sans-serif"],
                inter: ["Inter", "Inter Placeholder", "sans-serif"],
                oi: ["Oi", "serif"],
                archivo: ["Archivo", "sans-serif"],
            },
            colors: {
                orange: "#F7A072",
                bluey: "#0FA3B1",
                yellowy: "#EDDEA4",
            },
            fontWeight: {
                lighter: "50",
            },
            fontSize: {
                custom: ["calc(1vh * 10)"],
            },
            backgroundImage: {
                "hero-pattern":
                    "url(https://framerusercontent.com/images/kdEncsfqvdlql2jS17E2y0HMyEg.jpg?scale-down-to=512)",
            },
        },
    },

    plugins: [forms],
};
