import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { images } from '../styles/global';

export default function Match({ home, away, playDate, homeScore, awayScore, matchId, homeId, awayId }) {
  return (
    <View style={styles.matchContainer}>
      <View style={styles.container}>
        <Image source={images.logo[homeId]||images.logo[0]} style={styles.logo} />
        <Text style={styles.textCenter}>{home}</Text>
      </View>
      <View style={styles.score}> 
        <Text style={styles.textCenter}>{playDate}</Text>
        <Text style={styles.textCenter}>{homeScore} - {awayScore}</Text>
      </View>
      <View style={styles.container}>
        <Image source={images.logo[awayId]||images.logo[0]} style={styles.logo} />
        <Text style={styles.textCenter}>{away}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  score: {
    marginHorizontal: 20,
    alignSelf: 'center',    
  },
  textCenter: {
    color: '#ccc',
    textAlign: 'center',
  },
  matchContainer: {
    //flex: 1,
    backgroundColor: '#1f1f1f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 0,
    paddingVertical: 6,
    paddingHorizontal: 8,
    //borderRadius: 15    
  },
  container: {
    width: 100,
    //justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
  }
});
