import { BASE_URL } from '@/constants/variables';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LoadingScreen from '../components/loading';
import { buttonStyles, commonStyles, textStyles } from '../constants/styling';

export default function EditModal() {
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    handleRefresh();
  }, []);

  const handleSend = async () => {
    setLoading(true);
    try {
        const jsonData = await axios.post(BASE_URL +'/withVariation',JSON.parse(jsonText));
        console.log("Current JSON:", jsonText);
        setJsonText(JSON.stringify(jsonData.data));    
    } catch (error) {
        Alert.alert('Ungültiges JSON', 'Bitte stellen Sie sicher, dass der JSON-Text im richtigen Format ist.');
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
        const jsonData = await axios.get(BASE_URL +'/withVariation');
        console.log("Current JSON:", jsonText);
        setJsonText(JSON.stringify(jsonData.data));
    } catch (error) {
        Alert.alert('Ungültiges JSON', 'Bitte stellen Sie sicher, dass der JSON-Text im richtigen Format ist.');
    }
    setLoading(false);
  };

return (
<ImageBackground
      style={commonStyles.background}
      source={require('../assets/images/background.jpg')}
    >{!loading ? (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={100}
        value={jsonText}
        onChangeText={setJsonText}
        placeholder="Geben Sie hier JSON ein..."
      />
      <View style={styles.buttonContainer}>
            <View style={buttonStyles.buttonWrapper}>
                <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                  <Text style={textStyles.buttonText}>Refresh</Text>
                </TouchableOpacity>
            </View>
            <View style={buttonStyles.buttonWrapper}>
                <TouchableOpacity style={styles.refreshButton} onPress={handleSend}>
                  <Text style={textStyles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
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
    padding: 16,
  },
  textInput: {
    height: '85%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    textAlignVertical: 'top', // für multiline
    backgroundColor: '#ffffff'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
refreshButton: {
    width: 150, // 3-mal so breit
    height: 50, // gleiche Höhe wie addButton
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#000000'
  }
});
