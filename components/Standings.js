import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Picker, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import SingleTeamRecord from './SingleTeamRecord';
import { Card } from './CustomWrapper';

const seasons = ['2019/20', '2018/19', '2017/18', '2016/17', '2015/16', '2014/15', '2013/14', '2012/13', '2011/12', '2010/11'];
export default function Standings() {
    const [season, setSeason] = useState(seasons[0]);
    const [rankingAndRecords, setRankingAndRecords] = useState({loaded: false, ranking: [], records: {}});
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        const fetchMatches = async () => {
            const [from, to] = season.split("/");
            const res = await fetch(`https://football-result.herokuapp.com/api/v1/matches?from=${from}-08-01&to=20${to}-05-31`, {
                method: 'GET',
                headers: {
                  'Accept' : 'application/json'
                }                 
            });
            if(res.ok) {
                const json = await res.json();
                const records = {};
                json.forEach(match=>{
                    if(!records[match.home]) records[match.home] = {w:0, d:0, l:0, gf:0, ga:0}   
                    if(!records[match.away]) records[match.away] = {w:0, d:0, l:0, gf:0, ga:0}   
                    records[match.home].gf += match.homeScore
                    records[match.home].ga += match.awayScore
                    records[match.away].gf += match.awayScore
                    records[match.away].ga += match.homeScore
                    if(match.homeScore>match.awayScore) {records[match.home].w++;records[match.away].l++;}
                    if(match.homeScore<match.awayScore) {records[match.home].l++;records[match.away].w++;}
                    if(match.homeScore!==null&&match.homeScore==match.awayScore) {records[match.home].d++;records[match.away].d++;}  
                })
                Object.values(records).forEach(record=>{
                    record.mp=record.w+record.d+record.l;
                    record.pts=3*record.w+record.d;
                    record.gd=record.gf-record.ga;
                });
                const ranking = Object.keys(records).sort((p,q)=>{
                    return records[p].pts==records[q].pts ? -records[p].gd+records[q].gd : -records[p].pts+records[q].pts;
                })
                setRankingAndRecords({loaded: true, ranking, records})
            }else {throw new Error(`HTTP Status code : ${res.status}`)}
        }
        fetchMatches().catch(err=>{console.warn(`Something went wrong!\n${err}`)});
        return ()=>setRankingAndRecords({loaded: false, ranking: [], records: {}});
    }, [season]);
    const handleSeasonChange = (value, position) => setSeason(value);
    return (
        <View style={styles.standings}>
            <View style={styles.top}>
                <Card>
                    <Picker selectedValue={season} style={styles.picker} mode='dropdown' onValueChange={handleSeasonChange}>
                        {seasons.map((val, idx)=> {
                            return <Picker.Item key={idx} label={val} value={val}/>
                        })}
                    </Picker>   
                </Card>
                <MaterialIcons name='info' size={40} color='#ccc' style={styles.icon} onPress={()=>setModalOpen(true)}/>
            </View>
            {rankingAndRecords.loaded ? <FlatList
                style={{width: '100%'}}
                ListHeaderComponent={()=><SingleTeamRecord title='Club' record={{mp:'MP', w:'W', d:'D', l:'L', gf:'GF', ga:'GA', gd:'GD', pts:"Pts"}} rank='#' />}
                //horizontal={true}
                keyExtractor={item => item}
                initialNumToRender={20}
                data={rankingAndRecords.ranking}
                renderItem={({ item, index }) => {
                    return <SingleTeamRecord title={item} record={rankingAndRecords.records[item]} rank={index+1}/>
                }}
            /> : <ActivityIndicator size='large' color='#ccc'/>}
            <Modal visible={modalOpen} animationType='fade' transparent={true} onRequestClose={()=>setModalOpen(false)} onBackdropPress={()=>setModalOpen(false)}>
                <View style={styles.modal}>
                    <MaterialIcons name='cancel' size={40} color='#ccc' onPress={()=>setModalOpen(false)}/>
                    <Text style={styles.abbreviations}>Abbreviations</Text>
                    <Text style={styles.text}>{`MP: Matches Played\nW: Win\nD: Draw\nL: Loss\nGF: Goals For\nGA: Goals Against\nGD: Goal Difference\nPts: Points`}</Text>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    picker: {
        //backgroundColor: 'white',
        //alignSelf: 'center',
        //marginRight: 'auto',
        width: 140,
        height: 25,
        color: '#ccc',
        //backgroundColor: 'yellow'
        //transform: [{scaleX: 3.0}, {scaleY: 1.5}],
    },
    standings: {
        flex: 1,
        backgroundColor: '#080808',
        alignItems: 'center',
        //justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    top: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        //backgroundColor: 'green',
        //paddingHorizontal: 50,
        //marginHorizontal: 0,
    },
    icon: {
        position: 'absolute',
        //marginLeft: 'auto',
        bottom: 10,
        right: 10,
    },
    modal: {
        backgroundColor: '#121212dd',
        //marginHorizontal: 50,
        marginVertical: 130,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        alignSelf: 'center',
        //width: 200,
    },
    text: {
        fontSize: 20,
        color: '#999',
        marginBottom: 10,
    },
    abbreviations: {
        marginVertical: 10,
        fontSize: 20,
        color: '#999'
    }
});
