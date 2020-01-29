import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Card = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        elevation: 5,
        backgroundColor: '#1d1d1d',
        shadowOffset: {width: 10, height: 10},
        shadowColor: 'white',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    cardContent: {
        //alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        
    }
})