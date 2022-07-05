import React from "react";
import {View, Image, StyleSheet} from 'react-native';

const ImageScreen = props => {
  const imageUri = props.navigation.getParam('imageUri');
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: imageUri}}/>
    </View>
    
  );
};

ImageScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
  },
  image: {
      height: '50%',
      width: '200%',
      transform: [{ rotate: '90deg' }]
  }
});

export default ImageScreen;