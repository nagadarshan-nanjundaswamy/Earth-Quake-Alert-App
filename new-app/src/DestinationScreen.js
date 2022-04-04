import React from 'react';
import {useState} from 'react'
import {useEffect} from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';

const DestinationScreen = (props) => {
    const [destination, setDestination] = useState('')
    const [date, setDate] = useState(new Date())
    const [dateText, setDateText] = useState('Date')
    const [show, setShow] = useState(false)
    const isFocused = useIsFocused();

    useEffect(()=> {
        if (isFocused) {
          updateSomeFunction()
        }
    }, [isFocused])

    const updateSomeFunction = () => {
        if (!props.route.params) return
        if (props.route.params.flag=='edit') {
            let id = props.route.params.id
            let details = props.route.params.details
            for (let i=0; i<details.length; ++i) {
                if (details[i].id==id) {
                    setDateText(details[i].date)
                    setDestination(details[i].destination)
                }
            }
        }
    }

    const takeInputsAndReturnDone = () => {
        let flag = props.route.params.flag
        let details = props.route.params.details

        /// Check whether the text is entered
        if (destination.trim().length == 0) {
            alert('Please Enter the Destination')
            return
        }

        let localDateText = dateText
        if (localDateText == 'Date') {
            let today = new Date()
            localDateText = today.getDate() + '/' + (today.getMonth()+1) + '/' + (today.getFullYear())
        }
        var id=1
        if (flag=='add') {
            id = 1
            if (details.length>0) id=details[details.length-1].id + 1
            if (id==1)details = [{id: id, destination: destination.trim(), date: localDateText, result: 'Safe'}]
            else details = [...details, {id: id, destination: destination.trim(), date: localDateText, result: 'Safe'}]
            
        } else if (flag=='edit') {
            id = props.route.params.id
            for (let i=0; i<details.length; ++i) {
                if (details[i].id==id) {
                    details[i].destination = destination.trim()
                    details[i].date = localDateText
                }
            }
        }
        props.navigation.navigate("Home", {details: details, id:id, flag: flag, action: 'addEdit', screen: 'Two'})
    }

    const takeInputsAndReturnRemove = () => {
        let flag = props.route.params.flag
        let details = props.route.params.details

        if (flag=='edit') {
            if (details.length==1) {
                details = []
            } else {
                let id = props.route.params.id
                details = details.filter((detail) => detail.id !== id)
            }
        }
        props.navigation.navigate("Home", {details: details, flag: flag, action: 'remove', screen: 'Two'})
    }

    const onDateChange = (e, selectedDate) => {
        let today = new Date()
        let currentDate = selectedDate || date
        setShow(Platform.OS === 'ios');
        if (today>currentDate) currentDate = today
        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + (tempDate.getFullYear())
        setDateText(fDate)
    }


    return (
        <View style={styles.addscreen}>
            <View style={styles.addscreenTextBoxes}>
                <View style={styles.addscreenTexts}>
                    <TextInput 
                        placeholder="Destination"
                        style={styles.inputDestination}
                        onChange={(e)=> setDestination(e.nativeEvent.text)}
                        value={destination}
                    />
                </View>
                <View style={styles.addscreenTexts}>
                    <TextInput 
                        placeholder="Date"
                        style={styles.inputDestination}
                        editable={false}
                        value={dateText}
                    />
                </View>
                <Button
                    style={{padding:10}}
                    title='Pick Date'
                    onPress={() => setShow(true)}
                >
                </Button>
                {show && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={'date'}
                        onChange={onDateChange}
                    />
                )}
            </View>

            <View style={styles.addscreenButtons}>
                <View style={styles.btnAddscreen}>
                    <Button 
                        title="Remove"
                        style={styles.btnAddscreenRemove}
                        onPress = {()=>takeInputsAndReturnRemove()}
                    />
                </View>

                <View style={styles.btnAddscreen}>
                    <Button 
                        title="Done"
                        style={styles.btnAddscreenDone}
                        onPress = {()=>takeInputsAndReturnDone()}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // addscreen
    addscreen:{ 
        flex: 1, 
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        flexDirection: 'column'
    },

    addscreenTextBoxes: {
        flexDirection: 'column',
        flex: 1,
        // height: 100,
        // width: 250,
    },

    addscreenTexts: {
        borderWidth: 1,
        borderColor: 'black',
        height: 30,
        padding: 5,
        margin: 5,
        width: 250,
        // height:30,
    },

    addscreenBtnDate: {
        height: 30,
        padding: 5,
        margin: 5,
        width: 250,
        // height:30,
    },


    addscreenButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'black',
        // borderWidth: 1,
    },

    btnAddscreen: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
    },

    btnAddscreenRemove: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
    },

    btnAddscreenDone: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
    },

    inputDestination: {

    },
    
    inputDate: {

    },
});

export default DestinationScreen
