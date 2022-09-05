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
        light: "#E0EEEF",
        secondary: '#06686C'
      },
      "transit-black": {
        DEFAULT: "#333232",

      },
      "transit-white": {
        DEFAULT: "#FFFFFF",
      },
      "transit-grey": {
        superLight: "#D3D3D3",
        light: "#F9FAFC",
        300: "#B8BBBF",
        DEFAULT: "#F2F2F2",
        dark: "#687182",
        disabled: "#F7F9FC",
        secondary: "#4A4E51",
        100: "#F4F6F8"
      },
      "transit-red": {
        DEFAULT: "#FF0000",
      },
      "transit-blue": {
        light: "#A1A9B8"
      }
    },
    extend: {
      height: {
        header: "64px",
      },
      boxShadow: {
        header:
          "0px 1px 2px rgba(58, 58, 68, 0.24), 0px 2px 4px rgba(90, 91, 106, 0.24)",
        paginationButton:
          "0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(70, 79, 96, 0.16), 0px 2px 5px rgba(89, 96, 120, 0.1);",
        dateInput: "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(104, 113, 130, 0.16)",
        dateInputFocus: "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(104, 113, 130, 0.16), 0px 0px 0px 4px rgba(1, 126, 132, 0.45)",
        deleteButtonFocus: "0px 1px 1px rgba(0, 0, 0, 0.14), 0px 0px 0px 4px rgba(228, 29, 29, 0.25)",
        cancelButtonFocus: "0px 1px 1px rgba(0, 0, 0, 0.14), 0px 0px 0px 4px rgba(1, 126, 132, 0.45);",
        submitButton: "0px 2px 5px rgba(34, 100, 230, 0.12);"
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
