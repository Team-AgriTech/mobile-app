// themes/greenTheme.ts
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

export const GreenLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#34D399',       // Your green color
    background: '#FFFFFF',
    card: '#F0FDF4',
    text: '#065F46',
    border: '#D1FAE5',
    notification: '#10B981',
  },
};

export const GreenDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#10B981',
    background: '#064E3B',
    card: '#065F46',
    text: '#D1FAE5',
    border: '#10B981',
    notification: '#34D399',
  },
};
