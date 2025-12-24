/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1B4332', // Deep Forest
                secondary: '#F5EBE0', // Soft Sand
                accent: '#FB8500', // Safety Orange
            },
            fontFamily: {
                sans: ['Work Sans', 'sans-serif'],
                heading: ['Inter', 'sans-serif'],
                mono: ['IBM Plex Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
