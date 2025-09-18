import { StyleSheet, Text, View } from 'react-native';


export default function LoadingScreen() {
    return (
        <View style={styles.item}>
            <Text style={styles.loadingTitle}>Loading ...</Text>
      </View>
    );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#000000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  loadingTitle: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',

  },
});