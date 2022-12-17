/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}/** @type {import('tailwindcss').Config} */

module.exports = {
 
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    
    fontFamily: {
      sans: ['Source Sans Pro'],
    },
    fontWeight: {
      hairline: 100,
      'extra-light': 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      'extra-bold': 800,
      black: 900,
    },
    extend: {
      transitionProperty: {
        spacing: 'margin, padding',
        dropdown: 'opacity, transform'
      },
      animation: {
        beat: 'beat 1s ease-out infinite'
      },
      keyframes: {
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' }
        }
      },
      minHeight: {
        main: 'calc(100vh - 228px)'
      }
    },

  },
  safelist: [
    {
      pattern: /./
    },
  ],
  plugins: [

    require("@tailwindcss/aspect-ratio"),
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2484c7",
          "secondary": "#F000B8",  
          "accent": "#37CDBE",    
          "neutral": "#3D4451",     
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",                 
          "success": "#36D399",       
          "warning": "#FBBD23",    
          "error": "#EB0808",
          "danger": "#EB0808",
        }
      }
    ]
  }
}

