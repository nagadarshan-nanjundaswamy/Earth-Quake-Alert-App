import React from 'react';
import {useState} from 'react'
import {useEffect} from 'react'
import * as Location from 'expo-location'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps'; 
import { useIsFocused } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';



const ResultScreen = (props) => {
    
    const [mapData, setMapData] = useState([])
    const [textView, setTextView] = useState(true)
    const [initialLatitude, setInitialLatitude] = useState(39.1712077)
    const [initialLongitude, setInitialLongitude] = useState(-86.5668654)
    const [toggleFlag, setToggleFlag] = useState(false)
    const isFocused = useIsFocused();


    useEffect(()=> {
        if (isFocused) {
            getCoordinates()
        }
    }, [isFocused])

    const getCoordinates = async () => {
        if (!props.route.params) return
        let details = props.route.params.details
        let tempMapData = new Array()
        let initialRegionFlag = true
        
        let {status} = await Location.requestForegroundPermissionsAsync()
        if (status != "granted") {
            console.log('error')
            return
        } else {
            setToggleFlag(true)
            console.log('------------------------PERMISSION GRANTED------------------------------')
        }


        for (let i=0; i<details.length; ++i) {
            let destination = details[i].destination
            let color=(details[i].result=='Safe')?'green':'red'
            let key = details[i].id
            let result = await Location.geocodeAsync(destination)


            if (result.length>0) {
                let latitude = result[0].latitude
                let longitude = result[0].longitude
                let coordinates = {latitude: latitude, longitude: longitude}
                if (initialRegionFlag) {
                    setInitialLatitude(coordinates.latitude)
                    setInitialLongitude(coordinates.longitude)
                    initialRegionFlag = false
                }
                tempMapData.push({key:key, destination: destination, coordinates: coordinates, color: color})
            }
        }
        setMapData(tempMapData)
        console.log('------------------------READ MAP DATA------------------------------')
    }

    const getColor = (item) => {
        let color = (item.result=='Safe')?'green':'red'
        return {
            flex: 1,
            flexDirection: 'column',
            borderWidth: 1,
            borderColor: 'black',
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
            backgroundColor: color,
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.textMapView}>
                {textView ? (
                    <View>
                        <FlatList 
                            contentContainerStyle={{paddingBottom: 50}}
                            keyExtractor={(item) => item.id.toString()}
                            data={props.route.params.details}
                            renderItem={({item}) => (
                                <View style={getColor(item)}>
                                    <Text>Travel Destination: {item.destination}</Text>
                                    <Text>Travel Date: {item.date}</Text>
                                    <Text>Result: {item.result}</Text>
                                </View>
                            )}
                        />
                    </View>
                ): (
                    <MapView
                    style={styles.map}
                    provider='google'
                    initialRegion={{
                        latitude:initialLatitude,
                        longitude:initialLongitude,
                        latitudeDelta: 100,
                        longitudeDelta: 100,
                    }}
                    >
                        {mapData.map(element=>(
                            <Marker
                                key={element.key}
                                coordinate={element.coordinates}
                                title={element.destination}
                                pinColor={element.color}
                            >
                            </Marker>
                        ))}
                    </MapView>
                )}
            </View>

            

            <View style={styles.toggleButton}>
                {toggleFlag &&
                    <Button
                        style={{padding:10}}
                        title='Toggle View'
                        onPress={() => setTextView(!textView)}
                    >
                    </Button>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // resultscreen
    container:{ 
        flex: 1,
        alignItems: 'center', 
        backgroundColor: '#FFFFFF',
        flexDirection: 'column'
    },
    textMapView: {
        flex: 5,
    },

    map: {
        marginTop: 10,
        width: 500,
        height: 700,
    }, 

    toggleButton: {
        flex: 1,
    },
    
});

export default ResultScreen
