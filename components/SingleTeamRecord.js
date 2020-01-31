import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function SingleTeamRecord({ title, record, rank }) {
  return (
    <View style={styles.container}>
          <Text style={[styles.stat, styles.center]}>
              {rank}
          </Text>
          <Text style={styles.club}>
              {title}
          </Text>
          <Text style={styles.stat}>
              {record.mp} 
          </Text>
          <Text style={styles.stat}>
              {record.w} 
          </Text>
          <Text style={styles.stat}>
              {record.d}
          </Text>
          <Text style={styles.stat}>
              {record.l}
          </Text>
          <Text style={styles.stat}>
              {record.gf}
          </Text>
          <Text style={styles.stat}>
              {record.ga} 
          </Text>
          <Text style={{...styles.stat, flexBasis: 30}}>
              {record.gd} 
          </Text>
          <Text style={styles.stat}>
              {record.pts} 
          </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  club: {
      color: '#ccc',
      flexBasis: 150,
      //width: 180,
      flexShrink: 9,
      flexGrow: 9,
  },
  container: {
      flexDirection: 'row',
      paddingVertical: 1,
      flex: 1,      
      //flex: 9,
      //flexWrap: 'wrap',
      //justifyContent: 'center',
      //flexBasis: 1,
      //width: '10%',
      //flexGrow: 3,
      //backgroundColor: 'yellow'
  },
  stat: {
      color: '#ccc',
      flexBasis: 24,
      textAlign: 'right',
      flexShrink: 1,
      flexGrow: 1,
  },
  center: {
      textAlign: 'center',
  }
});


