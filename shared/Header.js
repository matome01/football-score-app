import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ navigation, title }) {
    const openMenu = () => {
        navigation.openDrawer();
    }
    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={36} onPress={openMenu} style={styles.icon} />
            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        //backgroundColor: 'white',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5        
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#ccc',
        letterSpacing: 0.8,
        marginHorizontal: 22,
    },
    icon: {
        color: '#ccc'
    }
})