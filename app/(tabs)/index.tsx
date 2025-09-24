import { Link } from 'expo-router';
import React, { useContext } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import LoadingScreen from '../../components/loading';
import { StorageContext } from '../context/appProvider';


export default function HomeScreen() {
  const { storage, isLoading } = useContext(StorageContext); 

 return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/background.jpg')}
      resizeMode='cover'
    >{!isLoading ? (
      <View style={styles.container}>
        <FlatList
          data={storage}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
          <Link
            style={styles.item}
            href={{ pathname: "/modal", params: { id: item.id, name: item.name } }}
          >
            <View style={styles.buttonWrapper}>
              <View style={styles.nameBox}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.price}>{item.price}€</Text>
              </View>
            </View>
          </Link>
            )}
        />
      </View>
      ):(
      <LoadingScreen/>  
    )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
  item: {
    backgroundColor: '#000000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  payPalItem: {
    
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 40,
    marginHorizontal:  10,
    borderRadius: 15,
    textAlign: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
  },  
  payPalTitle: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',

  },  
  loadingTitle: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',
  },
  price: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  buttonWrapper: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
  },
  priceBox:{
    flex: 0,
    alignItems: 'flex-end'
  },
  nameBox:{
    flex: 1,
    alignItems: 'flex-start'
  }
});
