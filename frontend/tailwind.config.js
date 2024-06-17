/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        popup: '0 0 25px 0 rgba(32, 38, 61, 0.15)',
      },
      gridTemplateColumns: {
        'fill-17': 'repeat(auto-fill, minmax(17rem, 1fr))',
        'fill-18': 'repeat(auto-fill, minmax(18rem, 1fr))',
        'fill-18-r4': 'repeat(4, minmax(18rem, 1fr))',
      },
      spacing: {
        4.5: '1.125rem',
        17: '4.25rem',
        17.5: '4.375rem',
        18: '4.5rem',
      },
      minHeight: {
        layout: 'calc(100vh - 10rem)',
        layoutSetup: 'calc(100vh - 70px)',
        layoutNoHeader: 'calc(100vh - 118px)',
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
      },
      fontSize: {
        md: ['0.9375rem', '1.5rem'],
        lg: ['1.125rem', '1.33'],
        '2xl': ['1.375rem', '1.36'],
        '3xl': ['1.5rem', '1.36'],
        '4xl': ['2rem', '1.31'],
        '5xl': ['3.125rem', '1.28'],
      },
      backgroundImage: {
        'login-img': "url('/images/background-login.webp')",
        'menu-img': "url('/images/background-menu.webp')",
      },
      zIndex: {
        background: -1,
        foreground: 1,
        5: 5,
        sidebar: 1000,
        header: 1100,
        modal: 1200,
        tooltip: 1300,
      },
      aspectRatio: {
        thumbnail: '250 / 190',
      },
      colors: {
        primary: {
          DEFAULT: '#a51271',
          tint: {
            10: '#ae2a7f',
            20: '#b7418d',
            30: '#c0599c',
            40: '#c971aa',
            50: '#d289b8',
            60: '#dba0c6',
            70: '#e4b8d4',
            80: '#edd0e3',
            90: '#f6e7f1',
          },
          shade: {
            10: '#951066',
            20: '#840e5a',
            30: '#730d4f',
            40: '#630b44',
            50: '#530939',
            60: '#42072d',
            70: '#310522',
            80: '#210417',
            90: '#10020b',
          },
        },
        secondary: {
          DEFAULT: '#20263d',
          tint: {
            10: '#363c50',
            20: '#4d5164',
            30: '#636777',
            40: '#797d8b',
            50: '#90939e',
            60: '#a6a8b1',
            70: '#bcbec5',
            80: '#d2d4d8',
            90: '#e9e9ec',
          },
          shade: {
            10: '#1d2237',
            20: '#1a1e31',
            30: '#161b2b',
            40: '#131725',
            50: '#10131f',
            60: '#0d0f18',
            70: '#0a0b12',
            80: '#06080c',
            90: '#030406',
          },
        },
        gray: {
          10: '#fcfbfe',
          20: '#f6f5f9',
          30: '#f1eff5',
          40: '#e5e3ed',
          50: '#d9d8e4',
          60: '#cdcddc',
          70: '#c0c1d4',
          80: '#b3b7cc',
          90: '#a6acc4',
        },
        buttercup: {
          DEFAULT: '#f2b016',
          tint: {
            10: '#f8d78a',
            20: '#fcefd0',
          },
          shade: {
            10: '#c18c11',
            20: '#79580b',
          },
        },
        jade: {
          DEFAULT: '#05ba6c',
          tint: {
            10: '#82dcb5',
            20: '#cdf1e1',
          },
          shade: {
            10: '#03824b',
            20: '#013720',
          },
        },
        cerise: {
          DEFAULT: '#da314f',
          tint: {
            10: '#ec98a7',
            20: '#fbeaed',
          },
          shade: {
            10: '#ae273f',
            20: '#821d2f',
          },
        },
        pacific: {
          DEFAULT: '#00b5c1',
          tint: {
            10: '#99e1e6',
            20: '#e5f7f8',
          },
          shade: {
            10: '#007e87',
            20: '#00484d',
          },
        },
        vivid: {
          DEFAULT: '#ff9382',
          tint: {
            10: '#ffbeb4',
            20: '#ffe9e6',
          },
          shade: {
            10: '#cc7568',
            20: '#7f4941',
          },
        },
        azure: {
          DEFAULT: '#017aff',
          tint: {
            10: '#99c9ff',
            20: '#e5f1ff',
          },
          shade: {
            10: '#0061cc',
            20: '#003d7f',
          },
        },
        electric: {
          DEFAULT: '#6c47ff',
          tint: {
            10: '#a690ff',
            20: '#e1daff',
          },
          shade: {
            10: '#5638cc',
            20: '#36237f',
          },
        },
        blaze: {
          DEFAULT: '#f96300',
          tint: {
            10: '#fba166',
            20: '#fddfcc',
          },
          shade: {
            10: '#c74f00',
            20: '#7c3100',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
