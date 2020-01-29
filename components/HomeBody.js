import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, ActivityIndicator } from 'react-native';
import MatchConatainer from './MatchContainer';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card } from './CustomWrapper';

export default function HomeBody() {
    const [period, setPeriod] = useState([moment().local().subtract(15, 'days').format("YYYY-MM-DD"), moment().local().subtract(0, 'days').format("YYYY-MM-DD")]);
    const [teamId, setTeamId] = useState(0);
    const [matchInfo, setMatchInfo] = useState({loaded: false, payload: []});
    const [teamInfo, setTeamInfo] = useState([]);
    const [datePickerShowFrom, setDatePickerShowFrom] = useState(false);
    const [datePickerShowTo, setDatePickerShowTo] = useState(false);
    useEffect(() => {
        const fetchMatch = async () => {
            const res = await fetch(`https://football-result.herokuapp.com/api/v1/matches?from=${period[0]}&to=${period[1]}&teamId=${teamId}`, {
              method: 'GET',
              headers: {
                'Accept' : 'application/json'
              }
            });
            if(res.ok) {
                const json = await res.json();
                setMatchInfo({loaded: true, payload: json})
            }else {throw new Error(`HTTP Status code : ${res.status}`)}
        }
        fetchMatch().catch(err=>console.warn(`Something went wrong!\n${err}`));
        return () => setMatchInfo({loaded: false, payloed: []});
    }, [ period, teamId ]);
    useEffect(() => {
        const fetchTeamInfo = async () => {
            const res = await fetch(`https://football-result.herokuapp.com/api/v1/teams/`,{
                method: 'GET',
                headers: {
                  'Accept' : 'application/json'
                }                 
            });
            if(res.ok) {
                const json = await res.json()
                setTeamInfo(json)
            }else {throw new Error(`HTTP Status code : ${res.status}`)}
        }
        fetchTeamInfo().catch(err=>console.warn(`Something went wrong!\n${err}`));
    }, []);
    const handleDateChange = (event, date, fromOrTo) => {
        if(date==undefined&&fromOrTo==0) {return setDatePickerShowFrom(false);} if(date==undefined&&fromOrTo==1) {return setDatePickerShowTo(false);} 
        //date = date || period[fromOrTo];
        if(fromOrTo == 0) {setDatePickerShowFrom(false);} else {setDatePickerShowTo(false);}
        setPeriod(fromOrTo == 0 ? [moment(date).format("YYYY-MM-DD"), period[1]] : [period[0], moment(date).format("YYYY-MM-DD")]);
    }
    const handleTeamChange = (value, position) => setTeamId(value)
    return (
        <View style={styles.container}>
            {datePickerShowFrom && <DateTimePicker value={Date.parse(period[0])} minimumDate={new Date(2010, 7, 6)} maximumDate={new Date(Date.parse(period[1]))} onChange={(event, date) => handleDateChange(event, date, 0)}/>}
            {datePickerShowTo && <DateTimePicker value={Date.parse(period[1])} minimumDate={new Date(Date.parse(period[0]))} onChange={(event, date) => handleDateChange(event, date, 1)}/>}
            <View style={styles.period}>
                <TouchableOpacity onPress={()=>setDatePickerShowFrom(true)}>
                    <Card>
                        <Text style={styles.text}>{period[0]}</Text>
                    </Card>
                </TouchableOpacity>
                <Text style={styles.text}>~</Text>
                <TouchableOpacity onPress={()=>setDatePickerShowTo(true)}>
                    <Card>
                        <Text style={styles.text}>{period[1]}</Text>
                    </Card>
                </TouchableOpacity>
            </View>
            <Card>
                <Picker selectedValue={teamId} style={styles.picker} mode='dropdown' onValueChange={handleTeamChange}>
                    <Picker.Item key={0} label='ALL' value={0}/>
                    {teamInfo.map(x=> {
                        return <Picker.Item key={x.teamId} label={x.title} value={x.teamId} />
                    })}
                </Picker>   
            </Card>
            {matchInfo.loaded ? <MatchConatainer matchInfo={matchInfo.payload} teamInfo={teamInfo} /> : <ActivityIndicator size='large' color='#ccc'/>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080808',
        alignItems: 'center',
        //justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    period: {
        //backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',        
    },
    picker: {
        color: '#ddd',
        width: 280,
        height: 22,
    },
    text: {
        color: '#ddd',
    },
});