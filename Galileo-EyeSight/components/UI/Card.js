import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>
        {props.children}
    </View>
};

const styles = StyleSheet.create({
  card: {
    //elevation: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)'
    }
});

export default Card;