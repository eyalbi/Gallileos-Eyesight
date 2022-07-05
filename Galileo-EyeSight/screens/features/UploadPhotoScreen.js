import React, {useCallback, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  View, 
  Text, 
  StyleSheet,
  Button,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import ImgToBase64 from 'react-native-image-base64';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import ImgPicker from "../../components/ImagePicker";
import Colors from "../../constans/Colors";
import * as resultActions from '../../store/actions/result';

const UploadPhotoScreen = props => {
	const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const imagePickedHandler = imagePath => {
    setSelectedImage(imagePath);
  }
  return (
    <ImageBackground 
      source={require('../../assets/Milky_Way_2005.jpg')}
      resizeMode="cover"
      style={styles.gradient}
    >
      {isAnalyzed ? <ActivityIndicator style={{height: '100%', width:'100%'}} size='large' color={'black'}/> :
        <View style={styles.form}>
          <ImgPicker 
            onImgPicked={imagePickedHandler}
            navigation={props.navigation}
          />
          <View style={styles.button}>
            <Button 
              disabled={!selectedImage}
              title='Analyze Photo'
              color={Colors.accent}
              onPress={() => {
                setTimeout(() => {
                  props.navigation.navigate({routeName: 'Analyze', params: {imageUri: selectedImage}});
                }, 0);
              }}
            />
          </View>
          <View style={styles.messageBox}>
            <View style={styles.content}>
              <Ionicons 
                name={'md-alert-circle'}
                size={16}
                color={"white"}
                
              />
              <Text style={styles.message}>For a better result please take a landscape image in aspect of [16:9] !</Text>
            </View>
          </View>
        </View>
      }
    </ImageBackground>
  );
};

UploadPhotoScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Upload Photo',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item 
            title='Menu'
            iconName={'md-menu'}
            onPress={() => {
                navData.navigation.toggleDrawer();
            }}
        />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    margin: 20,
    width: '40%',
  },
  gradient: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center'
  },
  messageBox: {
    borderColor: 'white',
    borderWidth: 2,
    width: '90%',
    margin: 30,
    elevation: 5
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  message: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    color: 'white',
    width: '90%'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});


export default UploadPhotoScreen;