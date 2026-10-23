/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "Tahoma", "Arial", "sans-serif"],
      },
      colors: {
        navy: {
          50: "#f0f4fa",
          100: "#dbe4f1",
          200: "#bccde4",
          300: "#8fadd1",
          400: "#6188ba",
          500: "#3f6ba3",
          600: "#2f5589",
          700: "#28456e",
          800: "#243c5c",
          900: "#1d2f4a",
          950: "#131e31",
        },
        royal: {
          50: "#eef3ff",
          100: "#e0eaff",
          200: "#c7d7fe",
          300: "#a4bcfd",
          400: "#8198fa",
          500: "#6475f6",
          600: "#4f56eb",
          700: "#4344d8",
          800: "#3838af",
          900: "#33368b",
          950: "#1f1e53",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(19, 30, 49, 0.05), 0 4px 16px rgba(19, 30, 49, 0.06)",
        "card-hover":
          "0 2px 4px rgba(19, 30, 49, 0.06), 0 12px 32px rgba(19, 30, 49, 0.12)",
      },
    },
  },
  plugins: [],
};
