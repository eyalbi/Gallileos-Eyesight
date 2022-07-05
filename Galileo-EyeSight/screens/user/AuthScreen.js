import React, {useReducer, useState, useEffect, useCallback} from 'react';
import { 
    KeyboardAvoidingView, 
    Button,
    View,
    StyleSheet, 
    ScrollView,
    ActivityIndicator,
    Alert,
    ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/input';
import Colors from '../../constans/Colors';
import Card from '../../components/UI/Card';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        };
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        };
    };
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        }, 
        inputValidities: {
            email: false,
            password: false
        }, 
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
        }
    },[error]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(
                    formState.inputValues.email, 
                    formState.inputValues.password
                )
        } else {
            action = authActions.login(
                    formState.inputValues.email, 
                    formState.inputValues.password
                )
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Screens');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView 
            behavior='height' 
            keyboardVerticalOffset={15} 
            style={styles.screen}
        >
            <ImageBackground 
            source={require('../../assets/Milky_Way_2005.jpg')}
                resizeMode='cover'
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id='email' 
                            label='E-Mail' 
                            keyboardType='email-address' 
                            required 
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                            />
                        <Input 
                            id='password' 
                            label='Password' 
                            keyboardType='default'
                            secureTextEntry
                            required 
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                            />
                        <View style={styles.button}>
                            {isLoading ? <ActivityIndicator 
                                            size='small' 
                                            color={Colors.primary}
                                        /> : 
                                <Button 
                                    title={isSignup ? '    Sign Up    ' : '    Login    '} 
                                    color={Colors.primary} 
                                    onPress={authHandler}
                                />
                            }
                        </View>
                        <View style={styles.button}>
                            <Button 
                                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} 
                                color={Colors.accent} 
                                onPress={() => {
                                    setIsSignup(prevState => !prevState);
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginTop: 10,
        alignItems: 'center'
    },
    authContainer: {
        padding: 20,
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
    }
});

export default AuthScreen;