import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

interface Variation {
  id: number;
  name: string;
  quantity: number;
}

const VARIATIONS: Variation[] = [
  { id: 1, name: 'Variation 1', quantity: 5 },
  { id: 2, name: 'Variation 2', quantity: 3 },
  // Mehr Variationen
];

export default function ModalScreen() {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/images/background.jpg')}
    >
      <Image
        style={styles.image}
        source={require('../assets/images/paypal.jpg')}
        contentFit="cover"
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  item: {
    backgroundColor: '#000000',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    marginTop: 0,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  buttonWrapper: {
    borderWidth: 1, 
    borderColor: 'red',
    color: 'red',
    borderRadius: 5,
    margin: 5, 
    overflow: 'hidden', 
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
  },
  header: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',
    
  },
  button: {
    borderWidth: 2,
    borderColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },
  addButton: {
    width: 50,  // Quadratisch
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  removeButton: {
    width: 150, // 3-mal so breit
    height: 50, // gleiche Höhe wie addButton
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonBox:{
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  image: {
    flex: 1,
    width: '100%',
    height: '80%',
    backgroundColor: '#0553',
    borderBlockColor: '#ffffff'
  },
});
