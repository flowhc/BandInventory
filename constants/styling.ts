import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
})

export const textStyles = StyleSheet.create({
header: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',    
    },
title: {
    color: '#ffffff',
    fontSize: 24,
    },
buttonText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
    },
});

export const buttonStyles = StyleSheet.create({
buttonWrapper: {
    borderWidth: 1, 
    borderColor: 'red',
    color: 'red',
    borderRadius: 5,
    margin: 5, 
    overflow: 'hidden', 
  },
})