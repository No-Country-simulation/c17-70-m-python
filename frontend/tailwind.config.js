/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'slate': colors.slate,
      'gray': colors.gray,
      'zinc': colors.zinc,
      'stone': colors.stone,
      'red': colors.red,
      'orange': colors.orange,
      'amber': colors.amber,
      'yellow': colors.yellow,
      'lime': colors.lime,
      'green': colors.green,
      'emerald': colors.emerald,
      'teal': colors.teal,
      'cyan': colors.cyan,
      'sky': colors.sky,
      'primary': {
        100: '#D2EEEC',
        200: '#A4DDD9',
        300: '#77CBC6',
        400: '#49BAB3',
        500: '#1CA9A0',
        600: '#168780',
        700: '#116560',
        800: '#0B4440',
        900: '#062220'
      },
      'secondary': {
        100: '#D0DFEE',
        200: '#A1BFDC',
        300: '#72A0CB',
        400: '#4380B9',
        500: '#1460A8',
        600: '#104D86',
        700: '#0C3A65',
        800: '#082643',
        900: '#041322'
      },
      'neutral': {
        100: '#E6EBEB',
        200: '#CCD7D7',
        300: '#B3C3C3',
        400: '#99AFAF',
        500: '#809B9B',
        600: '#667C7C',
        700: '#4D5D5D',
        800: '#333E3E',
        900: '#1A1F1F'
      },
      'error': {
        100: '#EED2D2',
        200: '#DDA4A4',
        300: '#CB7777',
        400: '#BA4949',
        500: '#CB1212',
        600: '#871616',
        700: '#651111',
        800: '#440B0B',
        900: '#220606'
      }
    }
  },
  plugins: []
}
