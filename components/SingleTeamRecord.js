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
          <Text style={styles.stat}>
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
      width: 150
  },
  container: {
      flexDirection: 'row',
      paddingVertical: 1,
  },
  stat: {
      color: '#ccc',
      width: 24,
      textAlign: 'right',
  },
  center: {
      textAlign: 'center',
  }
});


