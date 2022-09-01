/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      "transit-green": {
        DEFAULT: "#E0EEEF",
        dark: "#017E84",
      },
      "transit-black": {
        DEFAULT: "#333232",
      },
      "transit-white": {
        DEFAULT: "#FFFFFF",
      },
      "transit-grey": {
        light: "#F9FAFC",
        DEFAULT: "#F2F2F2",
        dark: "#687182",
        disabled: "#F7F9FC"
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
        paginationButton:
        "0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(70, 79, 96, 0.16), 0px 2px 5px rgba(89, 96, 120, 0.1);"
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
