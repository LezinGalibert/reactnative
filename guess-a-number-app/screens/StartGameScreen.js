import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(() => {
        const updateLayout = () => {
          setButtonWidth(Dimensions.get('window').width / 4);
        };
      
        Dimensions.addEventListener('change', updateLayout);
        return () => {
          Dimensions.removeEventListener('change', updateLayout);
        };
      });

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{
                    text: 'Okay',
                    style: "destructive",
                    onPress: resetInputHandler
                }])
            return
        }
        setConfirmed(true)
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <BodyText> You selected </BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onClic={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input style={styles.input}
                                blurOnSubmit
                                autoCorrect={false}
                                maxLength={2}
                                keyboardType="number-pad"
                                onChangeText={numberInputHandler}
                                value={enteredValue} />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.primary}></Button>
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.accent}></Button>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '90%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        padding: 10
    },
    input: {
        width: '20%',
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;