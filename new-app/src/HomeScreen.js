import React from 'react';
import {useState} from 'react'
import {useEffect} from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Image } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import earth from '../assets/earth2.jpg';


const HomeScreen = (props) => {
    const [details, setDetails] = useState([])
    const [data, setData] = useState([])
    const [resultFlag, setResultFlag] = useState(true)
    const [splashScreenFlag, setSplashScreenFlag] = useState(true)
    const isFocused = useIsFocused();
    const navigation = useNavigation()

    useEffect(()=> {
        if (resultFlag) {
            navigation.setOptions({
                headerShown: false,
            })
            setTimeout(()=>{
                timeOutFunction()
            }, 5000)
            getData()
            setResultFlag(false)
        }
        if (isFocused) {
          updateSomeFunction()
        }
    }, [isFocused])

    const timeOutFunction = async() => {
        setSplashScreenFlag(false)
        navigation.setOptions({
            headerShown: true,
        })
    }

    const getData = async () => {
        let urlPart = 'https://earthquake.usgs.gov/fdsnws/event/1/query?'
        let format = 'format=geojson'

        let today = new Date()

        let year = today.getFullYear()-1
        let month = today.getMonth()+1
        let date = (today.getDate()==29)?28:today.getDate()
        let yearBefore = year + '-' + month + '-' + date

        year = today.getFullYear()
        month = today.getMonth()+1
        date = today.getDate()
        let todayDate = year + '-' + month + '-' + date



        let startTime = 'starttime='+yearBefore
        let endtime = 'endtime='+todayDate
        let duration = startTime + '&' + endtime

        let alert = 'alertlevel=yellow'
        let apiURL = urlPart + format + '&' + duration + '&' + alert
        let res = await fetch(apiURL)
        let dataAPI = await res.json()

        var tempData = new Array()
        for (let i=0; i<dataAPI['features'].length; ++i) {
            let place = dataAPI['features'][i]['properties']['place']
            tempData.push(place)
        }
        setData(tempData)
        console.log('------------------------READ FROM API------------------------------')
    }

    const updateSomeFunction = () => {
        if (!props.route.params) return
        let paramDetails = props.route.params.details
        let paramAction = props.route.params.action
        if (paramAction=='addEdit') {
            let paramId = props.route.params.id
            for (let i=0; i<data.length; ++i) {
                for (let j=0; j<paramDetails.length; ++j) {
                    if (paramId==paramDetails[j].id) {
                        if (data[i].toLowerCase().includes(paramDetails[j].destination.toLowerCase())) {
                            paramDetails[j].result = 'Unsafe'
                        }
                    }
                }
            }
        }
        setDetails(paramDetails)
    }

    const addDestinations = () => {
        props.navigation.navigate("Second", {details: details, flag:'add'})
    }

    const deleteItem = (id) => {
        props.navigation.navigate("Second", {details: details, flag:'edit', id: id})
    }

    const goToResultsScreen = () => {
        props.navigation.navigate("Third", {details: details})
    }

    return (
        <View style={styles.homescreen}>
            {splashScreenFlag ? (
                <View style={styles.imgView}>
                    <Image style={styles.img} source={earth} />
                </View>
            ) : (
                <View style={styles.homescreen}>
                    <View style={styles.homescreenAddView}>
                        <View style={styles.homescreenAddView2}>
                            <Button 
                                title="Add Destination"
                                style={styles.btnHomescreenAdd}
                                onPress = {()=>addDestinations()}
                            />
                        </View>
                        <View style={styles.homescreenFlatListView}>
                            <FlatList 
                                contentContainerStyle={{paddingBottom: 110}}
                                keyExtractor={(item) => item.id.toString()}
                                data={details}
                                renderItem={({item}) => (
                                    <>
                                        <TouchableOpacity
                                            style={styles.homescreenTO}
                                            onPress={()=>deleteItem(item.id)}
                                        >
                                            <View style={styles.flatlistElements}>
                                                <Text
                                                    style={styles.flatlistElementOne}
                                                >
                                                    {item.destination}
                                                </Text>
                                                <Text
                                                    style={styles.flatlistElementTwo}
                                                >
                                                    {item.date}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                )}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.homescreenGoView}>
                        <View style={styles.homescreenRemoveView2}>
                            <Button 
                                title="Go"
                                style={styles.btnHomescreenGo}
                                onPress = {()=>goToResultsScreen()}
                            />
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    imgView: {
        width: '100%',
        height: '100%',
    },

    img: {
        width: '100%',
        height: '100%',
    },

    homescreen:{ 
        flex: 1, 
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
    },

    homescreenAddView: {
        flex: 7,
    },

    homescreenGoView: {
        flex: 1,
    },

    homescreenAddView2: {
        borderWidth: 1,
        borderColor: 'black',
    },

    homescreenRemoveView2: {
        borderWidth: 1,
        borderColor: 'black',
    },

    flatlistElements: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },

    flatlistElementOne: {
        justifyContent:'flex-end',
        flex: 1,
        fontSize: 20,
    },

    flatlistElementTwo: {
        justifyContent:'flex-end',
        flex: 1,
        fontSize: 14,
    },

    btnHomescreenAdd:{
        // alignSelf: 'flex-start'
    },
    
    btnHomescreenGo: {
        // alignSelf: 'flex-end'
    },


    homescreenFlatListView: {
        
    },

    homescreenTO: {
        
    },
});

export default HomeScreen
