import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Match from './Match';

export default function MatchContainer({ matchInfo, teamInfo }) {
   
  return (
    <View style={styles.container}>
        <FlatList
            ListHeaderComponent={()=><View style={{height: 15}}></View>}
            ListFooterComponent={()=><View style={{height: 15}}></View>}
            ListHeaderComponentStyle={{borderTopRightRadius: 15, borderTopLeftRadius: 15, backgroundColor: '#1d1d1d'}}
            ListFooterComponentStyle={{borderBottomRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: '#1d1d1d'}}
            ListEmptyComponent={()=><View><Text style={{color: '#ccc', backgroundColor: '#1d1d1d', paddingHorizontal: 20}}>There is no match!</Text></View>}
            keyExtractor={item => item.matchId.toString()}
            data={matchInfo}
            renderItem={({ item }) => {
                const homeInfo = teamInfo.filter(x=>x.title==item.home)[0];  
                const awayInfo = teamInfo.filter(x=>x.title==item.away)[0]; 
                return (
                <Match home={item.home} away={item.away} homeScore={item.homeScore} awayScore={item.awayScore} playDate={item.playDate} matchId={item.matchId}
                    homeId={homeInfo ? homeInfo.teamId : 0} awayId={awayInfo ? awayInfo.teamId : 0}
                />
            )}}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    //backgroundColor: '#1ffa12',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
