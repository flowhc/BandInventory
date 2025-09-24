import { useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoadingScreen from '../components/loading';
import { buttonStyles, textStyles } from '../constants/styling';
import { StorageContext } from './context/appProvider';
import { Variation } from './type/types';

export default function ModalScreen() {
  const { storage, updateVariation, isLoading } = useContext(StorageContext); 
  const {id, name}  = useLocalSearchParams();
  const [data, setData] = useState<Variation[]>([]);

  useEffect(() => {
    const item = storage.find(i => i.id.toString() === id);
    setData(item? item.variations : [])
  }, [id, storage]);

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/images/background.jpg')}
    >{!isLoading ? (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={textStyles.header}>Details for {name}</Text>
      </View>
      <FlatList
        //data={data.filter(item => item.quantity > 0)}        
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
         <View style={styles.item}>
          <View style={styles.buttonContainer}>
            <Text style={textStyles.title}>{item.name}: {item.quantity}</Text>
            <View style={styles.buttonBox}>
              <View style={buttonStyles.buttonWrapper}>
                <TouchableOpacity style={styles.removeButton} onPress={() => updateVariation(id.toString(), item.id.toString(), false)}>
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
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  removeButton: {
    width: 150,
    height: 50,
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
