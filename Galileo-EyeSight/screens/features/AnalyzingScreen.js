import React, {useState, useEffect, useCallback} from "react";
import {View, ImageBackground, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import { useDispatch } from "react-redux";
import * as FileSystem from 'expo-file-system';

import * as resultActions from '../../store/actions/result';

const AnalyzingScreen = props => {
  const [isAnalyzed, setIsAnalyzed] = useState(true);
  const imageUri = props.navigation.getParam('imageUri');
  const dispatch = useDispatch();
  useEffect(async () => {
    const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
    await dispatch(resultActions.analyzePhoto(base64, imageUri));
    setIsAnalyzed(false);
    props.navigation.navigate('Result');
  },[setIsAnalyzed]);

  return (
    <ImageBackground 
      source={require('../../assets/Milky_Way_2005.jpg')}
      resizeMode="cover"
      style={styles.gradient}
    >
      {isAnalyzed ? <ActivityIndicator style={{height: '100%', width:'100%'}} size='large' color={'black'}/> :
        <View>
          <Text>analyzing</Text>
        </View>
      }  
    </ImageBackground>    
  );

};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center'
  },
});

export default AnalyzingScreen;