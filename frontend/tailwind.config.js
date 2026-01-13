/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: "hsl(var(--primary))",
                card: "hsl(var(--card))",
                border: "hsl(var(--border))",
                sidebar: "hsl(var(--sidebar))",
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                secondary: {
                    DEFAULT: '#3b82f6', // blue for contrast
                    dark: '#2563eb',
                },
                dark: {
                    DEFAULT: '#1c1f26', // Deep Dark from Image 0
                    light: '#282c35',
                }
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
