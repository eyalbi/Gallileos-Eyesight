import React, {useEffect, useCallback, useState} from "react";
import { 
  View, 
  Text, 
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  ImageBackground
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import * as resultsActions from '../../store/actions/result';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from "../../constans/Colors";
import ResultItem from "../../components/resultItem";

const UserResultsScreen = props => {
	const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const results = useSelector(state => state.results.results);
    const dispatch = useDispatch();
  
    const loadResults = useCallback(async () => {
      setError(null);
      setIsRefreshing(true);
      try {
          await dispatch(resultsActions.fetchResults());
      } catch (err) {
          setError(err.message);
      }
      setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadResults);
    return () => {
        willFocusSub.remove();
    };
  }, [loadResults]);

  useEffect(() => {
    setIsLoading(true);
    loadResults().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadResults]);
  
  const selectItemHandler = (id) => {
    props.navigation.navigate({
        routeName: 'Result',
        params: {
          resultId: id,
        }
    });
  };

  if(error) {
    return (
      <View style={styles.centerd}>
          <Text style={styles.text}>An error ocurrred!</Text>
          <Button 
              title='Try again' 
              onPress={loadResults} 
              color={Colors.primary}
          />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary}/>
      </View>
    );
  };

  if (!isLoading && results.length == 0) {
    return (
       <View style={styles.centered}>
          <Text style={styles.text}>No results found!</Text>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('../../assets/Milky_Way_2005.jpg')}
      resizeMode="cover"
      style={styles.gradient}
    >
      <FlatList 
        onRefresh={loadResults}
        refreshing={isRefreshing}
        data={results}
        contentContainerStyle={styles.list}
        renderItem={itemData =>
          <ResultItem
            image={itemData.item.imageUri}
            consts={itemData.item.labelsNames}
            date={itemData.item.readableDate}
            onSelect={() => {
              selectItemHandler(itemData.item.id)
            }}
          />
        }
      />
    </ImageBackground>
  )
};

UserResultsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Results History',
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
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    textAlign: 'center'
  },
  list: {
    paddingBottom: 10,
  }
});


export default UserResultsScreen;