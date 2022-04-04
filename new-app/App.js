import React from 'react';
import HomeScreen from './src/HomeScreen';
import DestinationScreen from './src/DestinationScreen';
import ResultScreen from './src/ResultScreen';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen 
                        name="Home" 
                        component={HomeScreen}
                        options={{
                            title:"Home",
                        }} 
                    />
                    <Stack.Screen 
                        name="Second" 
                        component={DestinationScreen}
                        options={{
                            title:"Add Destination"
                        }}
                        
                    />
                    <Stack.Screen 
                        name="Third" 
                        component={ResultScreen}
                        options={{
                            title:"Result Screen"
                        }}  
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
