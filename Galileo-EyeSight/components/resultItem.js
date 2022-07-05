import React from "react";
import {
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TouchableNativeFeedback, 
  Platform,
} from "react-native";

import Card from '../components/UI/Card';

const ResultItem = props => {
  let TouchableCmp = TouchableOpacity;
  if(Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.result}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground style={styles.touchable} >
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: props.image}}/>
            </View>
            <View style={styles.details}>
              <Text style={styles.text}>{props.date}</Text>
              {/* <Text style={styles.text}>the constellations are shown in the photo:</Text>
              <Text style={styles.consts}>{arr}.</Text> */}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
    result: {
      height: 200,
      margin: 20,
    },
    touchable: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 5,
    },
    details: {
      alignItems: 'center',
      height: '30%',
      padding: 10
    },
    imageContainer: {
      width: '100%',
      height: '75%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    text: {
      fontFamily: 'open-sans-bold',
      fontSize: 18,
      color: '#03f',
      textDecorationLine: 'underline',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '23%',
      width: '50%',
      paddingHorizontal: 20
    }
});

export default ResultItem;