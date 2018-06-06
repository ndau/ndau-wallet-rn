import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions, Platform } from 'react-native';

export default class Home extends Component {

  // The press function takes in an argument (movie name) and pushes to the navigator the individual movie page
  // It also passes along the name of the movie which will be used fetch information from the OMDB API
  press(movie) {
    this.props.navigator.push({ 
      id: 2,
      // We can pass any information we want to the next scene as props
      passProps: {
        name: movie
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>flix<Text style={{color:'#ff4981'}}>.</Text></Text>
        {/*Each button will call the press function with a different movie name*/}
        <TouchableHighlight onPress={() => this.press('The Grand Budapest Hotel')} style={styles.outerButton}>
          <View style={styles.innerButton}>
            <Text style={styles.movieText}>The Grand Budapest Hotel</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.press("Rosemary's Baby")} style={styles.outerButton}>
          <View style={styles.innerButton}>
            <Text style={styles.movieText}>Rosemary's Baby</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.press('Kill Bill')} style={styles.outerButton}>
          <View style={styles.innerButton}>
            <Text style={styles.movieText}>Kill Bill</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.press('The Witch')} style={styles.outerButton}>
          <View style={styles.innerButton}>
            <Text style={styles.movieText}>The Witch</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.press('Fantastic Mr. Fox')} style={styles.outerButton}>
          <View style={styles.innerButton}>
            <Text style={styles.movieText}>Fantastic Mr. Fox</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.press('Nightmare Before Christmas')} style={styles.outerButton}>
          <View style={styles.innerButton}>
            <Text style={styles.movieText}>Nightmare Before Christmas</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(76,217,175,1)'
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 75,
    marginBottom: 50,
    fontWeight: 'bold',
    color: '#fff6d1'
  },
  movieText: {
    fontSize: 20,
    fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Light'
  },
  outerButton: {
    paddingVertical: 3,
    paddingHorizontal: 30
  },
  innerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#c9f3e7',
    borderLeftWidth: 5,
    borderColor: '#ff4981'
  }
});
