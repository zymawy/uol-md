import React, { useEffect, useState, } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import * as Font from 'expo-font';

function Square({value, border }) {
  return (
    <View style={[styles.square, border]}>
      <View style={styles.squareBox}>
        <Text style={styles.squareText}>{value}</Text>
      </View>
      </View>
  );
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
      const loadFont = async () => {
        await Font.loadAsync({
          'TicTacToe': require('./assets/fonts/TicTacToe.ttf'),
        });
        setFontLoaded(true);
      };

      loadFont()
    }, []);
    const renderSquare = (obj) => {
    
        const border = [];
        if (obj.key % 3 !== 0) { 
            border.push(styles.borderLeft);
        }
        if (obj.key > 2) {
            border.push(styles.borderTop);
        }
        return <Square value={obj.value} border={border} />;
      };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        {[{key:0, value: 'O' }, {key:1, value: 'O' }, {key:2, value: 'X' }].map(renderSquare)}
        {/* <Square value={'O'} />
        <Square value={'O'} />
        <Square value={'X'} /> */}
      </View>
      <View style={styles.row}>
      {[{key:3, value: 'X' }, {key:4, value: 'O' }, {key:5, value: 'O' }].map(renderSquare)}
        {/* <Square value={'X'} />
        <Square value={'O'} />
        <Square value={'O'} /> */}
      </View>
      <View style={styles.row}>
      {[{key:6, value: 'X' }, {key:7, value: 'X' }, {key:8, value: 'O' }].map(renderSquare)}
        {/* <Square value={'X'} />
        <Square value={'X'} />
        <Square value={'O'} /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'TicTacToe'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 15,
    marginLeft: 15,
    // backgroundColor: '#E06D83'
  },
  square: {
    flex: 1,
    width: 100,
    height: 100,
    borderWidth: 3,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  squareBox: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderWidth: 0,
    borderColor: '#d0d0d0',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.32,
    shadowRadius: 2.22,
    alignContent: 'center',
    justifyContent: 'center',
  },
  squareText: {
    alignSelf:'center',
    fontFamily: 'TicTacToe',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  borderLeft: {
    borderLeftWidth: 6,
    borderColor: '#000',
    fontFamily: 'TicTacToe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.32,
    shadowRadius: 2.22,
  },
  borderTop: {
    borderTopWidth: 6,
    borderColor: '#000',
    fontFamily: 'TicTacToe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.32,
    shadowRadius: 2.22,
  }
});
