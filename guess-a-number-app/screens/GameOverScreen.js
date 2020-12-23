import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native'

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText style={styles.title}>The Game is Over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        //source={require('../assets/success.png')}
                        source={{ uri: 'https://cosmosmagazine.com/wp-content/uploads/2020/02/190218-mount-full.jpg' }}
                        resizeMode='cover'
                    />
                </View>
                <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.</BodyText>
                <MainButton onClic={props.onRestart}>START NEW GAME</MainButton>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.35,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultText: {
        width: '80%',
        textAlign: 'center',
        fontSize: 18
    },
    title: {
        fontSize: 20
    }
});

export default GameOverScreen;