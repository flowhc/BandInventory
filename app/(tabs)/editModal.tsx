import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LoadingScreen from '../../components/loading';
import { buttonStyles, commonStyles, textStyles } from '../../constants/styling';
import { StorageContext } from '../context/appProvider';


export default function EditModal() {
  const { storage, updateStorage, isLoading } = useContext(StorageContext); 
  const [jsonText, setJsonText] = useState('');
  
  useEffect(() => {
    setJsonText(JSON.stringify(storage));
  }, [storage]);

  const handleSend = () =>{
    console.log("save json: " + jsonText);
    updateStorage(JSON.parse(jsonText));
    console.log("storage ist nowq: " + JSON.stringify(storage));
    //updateItems();
  }

return (
<ImageBackground
      style={commonStyles.background}
      source={require('../../assets/images/background.jpg')}
    >{!isLoading ? (
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
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    textAlignVertical: 'top', 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
