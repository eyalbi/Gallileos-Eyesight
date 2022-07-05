import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import {useSelector} from 'react-redux'
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from '../../components/UI/HeaderButton';

const ResultScreen = props => {
  let id = props.navigation.getParam('resultId');
  if(typeof id === 'undefined'){
    id = useSelector(state => state.results.currentId);
  };
  const img = useSelector(state => state.results.results.find(res => res.id === id)).imageUri;
  const labelsNames = useSelector(state => state.results.results.find(res => res.id === id)).labelsNames;
  const arr = labelsNames.map((constellation) => `${constellation}`).join(', ');

  return(
    <ImageBackground 
      source={require('../../assets/Milky_Way_2005.jpg')}
      resizeMode="cover"
      style={styles.gradient}
    >
      <View style={styles.imagePicker}>
        <TouchableOpacity onPress={() => {props.navigation.navigate({routeName: 'ImageShow', params: {imageUri: img}})}}  useForeground style={styles.imagePreview}>
          <Image style={styles.image} source={{uri: img}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
          <Text style={styles.text}>the constellations are shown in the photo:{'\n'}</Text>
          <Text style={styles.consts}>{arr}.</Text>
        </View>
    </ImageBackground>
  );
};

ResultScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Result',
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
  gradient: {
    flex: 1,
    paddingTop: 10
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
    width: '100%'
  },
  image: {
    width: '100%',
    height: '100%'
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
  details: {
    alignItems: 'center',
    height: '30%',
    padding: 10
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 26,
    color: 'black',
    textDecorationLine: 'underline',
  },
  consts: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: 'black',
    marginBottom: 10
  },
});


export default ResultScreen;