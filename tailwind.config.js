/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#FF6600"
            },
            fontFamily: {
                sans: ["Work Sans", "sans-serif"],
                geist: ["Geist", "sans-serif"]
            }
        }
    },
    plugins: []
};
