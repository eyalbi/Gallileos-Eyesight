import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import Colors from '../constans/Colors';
import { 
	Platform, 
	SafeAreaView, 
	Button, 
	View 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import UploadPhotoScreen from '../screens/features/UploadPhotoScreen';
import ResultScreen from '../screens/features/ResultScreen';
import UserResultsScreen from '../screens/user/UserResultsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import ImageScreen from '../screens/features/ImageScreen';
import AnalyzingScreen from '../screens/features/AnalyzingScreen';
import * as AuthActions from '../store/actions/auth';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: 'black'
	},
	headerTitleStyle: {
			fontFamily: 'open-sans-bold',
			fontSize: 22
	},
	headerTintColor: 'white',
	...TransitionPresets.FadeFromBottomAndroid
}

const FeaturesNavigator = createStackNavigator(
{
	UploadPhoto: UploadPhotoScreen,
	ImageShow: ImageScreen,
	Result: ResultScreen,
	Analyze: AnalyzingScreen
},
{
	navigationOptions: {	
			drawerIcon: drawerConfig => (
					<Ionicons 
							name={'md-camera'}
							size={23}
							color={drawerConfig.tintColor}
					/>
			)
	},
	defaultNavigationOptions: defaultNavOptions
}
);

const UserNavigator = createStackNavigator(
{
	UserResults: UserResultsScreen,
	ImageShow: ImageScreen,
	Result: ResultScreen
},
{
	navigationOptions: {
		drawerIcon: drawerConfig => (
			<Ionicons 
				name={'md-list'}
				size={23}
				color={drawerConfig.tintColor}
			/>
		)
	},
	defaultNavigationOptions: defaultNavOptions
}
);

const ScreensNavigator = createDrawerNavigator(
{
	UploadPhoto: FeaturesNavigator,
	Results: UserNavigator
},
{
	contentOptions: {
		labelStyle: {
			fontFamily: "open-sans-bold",
			fontSize: 16,
		},
		activeBackgroundColor: Colors.primary,
		activeTintColor: 'white',
		inactiveBackgroundColor: 'white',
		inactiveTintColor: 'black',
		itemsContainerStyle: {
			paddingTop: '10%',
		}
	},
		drawerType: 'slide',
		drawerBackgroundColor: 'white',
		contentComponent: props => {
			const dispatch = useDispatch();
			return (
				<LinearGradient
					colors={['black', 'rgba(0,0,0,0.8)']}
					style={{
						flex: 1
					}}
				>
					<View style={{flex: 1, paddingTop: 30}}>
						<SafeAreaView 
							forceInset={{
								top: 'always', 
								horizontal: 'never'
							}}
							>
							<DrawerNavigatorItems 
								{...props}
								itemStyle={{
									borderBottomWidth: 2, 
									borderBottomColor: '#ccc',
									borderTopColor: '#ccc',
									borderTopWidth: 2,
									marginTop: 3
								}}
								/>
							<View style={{marginTop: 50}}>
								<Button 
									title='Logout' 
									color={Colors.accent}
									onPress={() => {
										dispatch(AuthActions.logout());
									}}
									/>
							</View>
						</SafeAreaView>
					</View>
				</LinearGradient>
			);
		}
	}
);

const AuthNavigator = createStackNavigator(
{
		Auth: AuthScreen
},
{
		defaultNavigationOptions: defaultNavOptions
}
);

const MainNavigator = createSwitchNavigator(
{
		Startup: StartupScreen,
		Auth: AuthNavigator,
		Screens: ScreensNavigator
}
);

export default createAppContainer(MainNavigator);