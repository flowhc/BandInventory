import axios from 'axios';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import LoadingScreen from '../components/loading';
import { BASE_URL } from '../constants/variables';

interface Item {
  id: number;
  name: string;
  price: string;
}

const DATA: Item[] = [
  { id: 1, name: 'Item 1', price: '$10.00' },
  { id: 2, name: 'Item 2', price: '$20.00' },
  // Weitere einfügen
];

export default function HomeScreen() {

  const [data, setData] = useState<Item[]>(DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL);
        console.log(response.data);
        setData(response.data);
        console.log("API Call success")
      } catch (error) {
        console.log("API Call crashed")
        console.error(error);
      } finally {
        setLoading(false);
        console.log("API Call success 2")

      }
    };
    fetchData();
  }, []);

 return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/images/background.jpg')}
      resizeMode='cover'
    >{!loading ? (
      <View style={styles.container}>
        <FlatList
          data={data}
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
        <View >
          <Link
            style={styles.payPalItem}
            href={{ pathname: "/payPalModal" }}
          >
            <Text style={styles.payPalTitle}> PayPal</Text>
          </Link>
        </View>
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
    width: '35%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 40,
    marginHorizontal: 40,
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
    justifyContent: 'space-between', 
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
