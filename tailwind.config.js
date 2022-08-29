/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      "transit-green": {
        DEFAULT: "#E0EEEF",
        dark: "#06686C",
      },
      "transit-black": {
        DEFAULT: "#333232",
      },
      "transit-white": {
        DEFAULT: "#FFFFFF",
      },
      "transit-grey": {
        DEFAULT: "#F2F2F2",
      },
      "transit-red": {
        DEFAULT: "#FF0000",
      },
    },
    extend: {
      height: {
        header: "64px",
      },
      boxShadow: {
        header:
          "0px 1px 2px rgba(58, 58, 68, 0.24), 0px 2px 4px rgba(90, 91, 106, 0.24)",
      },
      borderColor: {
        transparent: "rgba(90, 91, 106, 0.0)",
      },
      backgroundImage: {
        'hero-image': "url('../shared/images/heroImage.jpg')",
      }
    },
  },
  plugins: [],
};
