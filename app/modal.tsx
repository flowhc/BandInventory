import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoadingScreen from '../components/loading';

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

  const {id, name}  = useLocalSearchParams();
  const [data, setData] = useState<Variation[]>(VARIATIONS);
  const [loading, setLoading] = useState(true);

  const endpoint = 'http://localhost:8080/api/v1/products';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint +'/variation/'+ id);
        setData(response.data);
        console.log("API VARIATIONS Call success")
      } catch (error) {
        console.log("API VARIATIONS Call crashed")
        console.error(error);
      } finally {
        setLoading(false);
        console.log("API VARIATIONS Call success 2")

      }
    };
    fetchData();
  }, []);

 const handlePress = async (variation: number, endpoint: string, increase: boolean) => {
  const bodyData = {
    id: id,
    variationId: variation,
    increase: increase
  };

  try {
    const response = await axios.post(endpoint, bodyData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setData(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
};


  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/images/background.jpg')}
    >{!loading ? (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.header}>Details for {name}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
         <View style={styles.item}>
          <View style={styles.buttonContainer}>
            <Text style={styles.title}>{item.name}: {item.quantity}</Text>
            <View style={styles.buttonBox}>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.removeButton} onPress={() => handlePress(item.id, endpoint, false)}>
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.addButton} onPress={() => handlePress(item.id, endpoint, true)}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
    flexDirection: 'row', // Horizontale Ausrichtung der Kinder
    justifyContent: 'flex-end'
  }
});
