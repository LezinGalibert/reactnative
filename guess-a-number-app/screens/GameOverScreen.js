import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import GameScreen from './GameScreen';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}> 
            <Text>The Game is Over!</Text>
            <Text>Number of rounds: {props.roundNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title="START NEW GAME" onPress={props.onRestart}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default GameOverScreen;