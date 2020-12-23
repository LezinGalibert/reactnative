import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions, Keyboard } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rNum = Math.floor(Math.random() * (max - min)) + min

    if (rNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rNum
    }
};

const renderListItem = (value, numberOfRounds) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numberOfRounds}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);


const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 99, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)


    const currentLow = useRef(1)
    const currentHigh = useRef(99)

    const { userChoice, onGameOver } = props

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
          };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert('Liar liar',
                'Pants on fire',
                [{
                    text: "Give a correct hint",
                    style: 'cancel'
                }]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses,]);
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <TitleText>Opponent's Guess</TitleText>
                <Card style={styles.buttonContainer}>
                    <MainButton onClic={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color='white' />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onClic={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color='white' />
                    </MainButton>
                </Card>
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <TitleText>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onClic={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color='white' />
                </MainButton>
                <MainButton onClic={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: '80%'
    },
    listItem: {
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        width: '60%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 300 ? '50%' : '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

export default GameScreen;