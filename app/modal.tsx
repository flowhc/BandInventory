import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoadingScreen from '../components/loading';
import { buttonStyles, textStyles } from '../constants/styling';
import { BASE_URL } from '../constants/variables';


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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL +'/variation/'+ id);
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
  setLoading(true);
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
    setLoading(false);
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
        <Text style={textStyles.header}>Details for {name}</Text>
      </View>
      <FlatList
        data={data.filter(item => item.quantity > 0)}        
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
         <View style={styles.item}>
          <View style={styles.buttonContainer}>
            <Text style={textStyles.title}>{item.name}: {item.quantity}</Text>
            <View style={styles.buttonBox}>
              <View style={buttonStyles.buttonWrapper}>
                <TouchableOpacity style={styles.removeButton} onPress={() => handlePress(item.id, BASE_URL, false)}>
                  <Text style={textStyles.buttonText}>Sell</Text>
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
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    marginTop: 0,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
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
  }
});
