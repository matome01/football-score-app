import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Navigator from './routes/Drawer';
import { AppLoading } from 'expo';

export default function App() {
  return (
      <Navigator />
       //<AppLoading />
    
  );
}