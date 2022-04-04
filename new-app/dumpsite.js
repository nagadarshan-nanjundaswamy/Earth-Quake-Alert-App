{/* <View>
    {displayFlag ?(
        <View style={styles.resultscreen}>
        <View styles={styles.resultTextScreen}>
            {displayFlag && (
                <View>
                    <Text>Destination: {props.route.params.details[0].destination}</Text>
                    <Text>Travel Date: {props.route.params.details[0].date}</Text>
                    <Text>Destination is {result}</Text>
                </View>
            )}
        </View>

        <View styles={styles.resultMapScreen}>
            {displayFlag && (
                <View styles={styles.mapParent}>
                    <Text>The below is the map marker showing that either the earthquake or Tsunami has occured</Text>
                    <MapView
                        style={styles.map}
                        provider='google'
                        initialRegion={{
                            latitude:latitude,
                            longitude:longitude,
                            latitudeDelta: 2,
                            longitudeDelta: 2,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude:latitude,
                                longitude:longitude,
                            }}
                            pinColor={result?'red':'green'}
                        >
                        </Marker> 
                    </MapView>
                </View>
            )}
        </View>

        {/* <Text>Fetching from API</Text>
        <Button 
        title="Home"
        onPress = {()=>props.navigation.navigate("Home")}
        /> */}
//     </View>
//     ):(
//         <View>
//             <Text>Loading</Text>
//             {temp && <Text>Displayed</Text>}
//         </View>
//     )} 
// </View>


// const styles = StyleSheet.create({
//     // resultscreen
//     resultscreen:{ 
//         flex: 1,
//         alignItems: 'center', 
//         backgroundColor: '#FFFFFF',
//         flexDirection: 'column'
//     },

//     resultTextScreen: {
//         flex: 1,
//     },

//     resultMapScreen: {
//         flex: 5,
//         width: '100%',
//         height: '100%',
//     },
//     map:{
//         marginTop:10,
//         width: '100%',
//         height: '100%',
//     },

//     mapParent: {
//         width: 400,
//         height: 400,
//     },
// });


// let today = new Date()

//         let year = today.getFullYear()-1
//         let month = today.getMonth()+1
//         let date = (today.getDate()==29)?28:today.getDate()
//         let yearBefore = year + '-' + month + '-' + date

//         year = today.getFullYear()
//         month = today.getMonth()+1
//         date = today.getDate()
//         let todayDate = year + '-' + month + '-' + date
//         console.log(todayDate)
//         console.log(yearBefore) */}


{/* <Marker
    coordinate={{
        latitude:0,
        longitude:0,
    }}
    pinColor='green'
>
</Marker>  */}


// const [mapData, setMapData] = useState([{color: 'red', 
//                                         destination:'Pocito', 
//                                         key:1, 
//                                         coordinates: {latitude: -31.683330500000004, longitude: -68.5833511}},
//                                     {color: 'green',
//                                         destination: 'England',
//                                         key: 2,
//                                         coordinates: {latitude: 52.3555177, longitude: -1.1743196999999999}}])




{/* <View style={styles.homescreen}>
            {permissionFlag ? (
                <>
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
                                                    <Text>{item.destination}</Text>
                                                    <Text>{item.date}</Text>
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
                </>
            ): (
                <View style={styles.homescreen}>
                    <Text>
                        Please grant the location permission.
                    </Text>
                    <Text>
                        If the location permission is granted. Restart the App
                    </Text>
                </View>
            )}
            
        </View> */}


{/* <Button 
                                title="Add Destination"
                                style={styles.btnHomescreenAdd}
                                onPress = {()=>addDestinations()}
                            /> */}