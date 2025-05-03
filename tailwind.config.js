/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        facebook: {
          blue: '#3B5998',
          lightblue: '#6D84B4',
          highlight: '#D8DFEA',
          border: '#C4CDE0',
          text: '#333333',
          link: '#3B5998',
          button: '#5B74A8',
          buttonHover: '#4A67A0'
        }
      },
      boxShadow: {
        'facebook': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'facebook': ['Lucida Grande', 'Tahoma', 'Verdana', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};