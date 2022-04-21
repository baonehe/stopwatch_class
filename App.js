/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{Component} from 'react';
 import { View, Text, StyleSheet, TouchableHighlight,TextInput,AppRegistry,Flatlist,ScrollView } from 'react-native';
 import formatTime from 'minutes-seconds-milliseconds'
 
 class app extends Component {
   constructor(props){
     super(props);
     this.state= {
       timeElapse: null,
       running: false,
       startTime: null,
       laps: [],
     };
     this.handleStartPress= this.handleStartPress.bind(this);
     this.startStopButton = this.startStopButton.bind(this);
     this.handleLapPress = this.handleLapPress.bind(this);
     }
 
     handleStartPress(){
       if(this.state.running){
         clearInterval(this.interval);
         this.setState({running: false});
         return
       }
       this.setState({startTime: new Date()});
       this.interval = setInterval(() => {
           this.setState({
             timeElapse:new Date() - this.state.startTime,
             running: true
           });
       }, 30);
     }
 
     laps() {
       return this.state.laps.map(function(time,index){
         return  <View key = {index}style = {styles.lap}>
         <Text style={styles.lapText}>
             Lap #{index+1}
           </Text>
           <Text style={styles.lapText}>
             {formatTime(time)}
           </Text>
       </View>
       });
     }
 
     handleLapPress(){
       var lap= this.state.timeElapse;
       this.setState({
         startTime: new Date(),
         laps: this.state.laps.concat([lap])
       });
     }
 
     startStopButton(){
       var style = this.state.running? styles.stopButton :styles.startButton;
       return <TouchableHighlight underlayColor="gray" 
       onPress={this.handleStartPress} style={[styles.button, style,{backgroundColor:"#B4FF9F"}]}>
         <Text>
           {this.state.running ? 'Stop' : 'Start'}
         </Text>
       </TouchableHighlight>
     }
 
     lapButton(){
       return <TouchableHighlight style= {styles.button}
       underlayColor = 'gray' onPress={this.handleLapPress}>
         <Text>Lap</Text>
       </TouchableHighlight>
     }
     
     render() {
       return <View style={styles.container}>
         <View style={styles.header}>
           <View style={styles.timerWrapper}>
             <Text style={styles.timer}>
               {formatTime(this.state.timeElapse)}
             </Text>
           </View>
           <View style={styles.buttonWrapper}>
             {this.lapButton()}
             {this.startStopButton()}
           </View>
           </View>
           <ScrollView style={styles.footer}>
             {this.laps()}
           </ScrollView>
         </View>
     } 
 }
 
 export default app;
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     margin: 10
   },
   header: {
     flex: 1
   },
   footer: {
     flex: 1
   },
   timerWrapper: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   },
   buttonWrapper: {
     flex: 2,
     flexDirection: 'row',
     justifyContent: 'space-around',
     alignItems: 'center'
   },
   lap: {
     justifyContent: 'space-around',
     flexDirection: 'row',
     backgroundColor: 'lightpink',
     padding: 10,
     marginTop: 10
   },
   button: {
     borderWidth: 2,
     height: 100,
     width: 100,
     borderRadius: 50,
     justifyContent: 'center',
     alignItems: 'center'
   },
   timer: {
     fontSize: 60
   },
   startButton:{
     borderColor: 'green'
   },
   stopButton: {
     borderColor: 'red',
     backgroundColor:'red'
   },
   lapText: {
     fontSize: 30
   }
 });
 AppRegistry.registerComponent('stopwatch_class',() => app);
