import React, {useState} from "react";
import { 
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import Colors from "../constans/Colors";

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    const result2 = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!', 
        "You need to grant camera permissions to use this app.",
        [{text: 'okay'}]
      );
      return false;
    } 
    if (result2.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!', 
        "You need to grant media library permissions to use this app.",
        [{text: 'okay'}]
      );
      return false;
    } 
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      
    });
    setPickedImage(image.uri);
    props.onImgPicked(image.uri);
  };
  
  const PickImageHandler = async() => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [16, 9]
    });
    setPickedImage(image.uri);
    props.onImgPicked(image.uri);
  };
  return (
    <View style={styles.imagePicker}>
      <TouchableOpacity onPress={() => {props.navigation.navigate({routeName: 'ImageShow', params: {imageUri: pickedImage}})}}  useForeground disabled={!pickedImage} style={styles.imagePreview}>
        {!pickedImage ? (
          <Text style={{fontSize:18, fontFamily: 'open-sans-bold', color: 'white'}}>No image picked yet.</Text>
        ): (
          <Image style={styles.image} source={{uri: pickedImage}}/>
        )}
      </TouchableOpacity>
      <View style={styles.ButtonContainer}>
        <View style={styles.button}>
          <Button 
          title='Take Image'
          color={Colors.primary}
          onPress={takeImageHandler}
          />
        </View>
        <View style={styles.button}>
          <Button 
            title='Gallery'
            color={Colors.primary}
            onPress={PickImageHandler}
          />
        </View>
      </View>
    </View>
 );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
    width: '90%'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 20
  },
  button: {
    width: '30%'
  }
});

export default ImgPicker;