
export const Colors = {
  // Primary Colors
  primary: '#EC4B7A',
  secondary1: '#F87F64',
  secondary2: '#FE9F54',
  tertiary: '#FEB653',

  // Gradient Arrays
  gradients: {
    splash: ['#EC4B7A', '#F87F64', '#FE9F54', '#FEB653'],
    card: ['#EC4B7A', '#F87F64'],
  },

  // UI Colors
  like: '#4CD964',
  nope: '#FF3B30',
  white: '#FFFFFF',
  black: '#000000',
  background: '#FAFAFA',
  text: {
    dark: '#424242',
    light: '#999999',
    white: '#FFFFFF',
  },

  // Card Colors
  card: {
    background: '#FFFFFF',
    shadow: '#000000',
  },

  // Overlay Colors
  overlay: {
    like: 'rgba(76, 217, 100, 0.3)',
    nope: 'rgba(255, 59, 48, 0.3)',
  },
  
  // Border Color
  border: '#E0E0E0',
} as const;

export default Colors;

