import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';

function Square({value, border, onPress }) {
  return (
    <TouchableOpacity style={[styles.square, border]} onPress={onPress}>
      <View style={styles.squareBox}>
        <Text style={styles.squareText}>{value}</Text>
      </View>
    </TouchableOpacity>
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

    loadFont();
  }, []);

  const renderSquare = (obj) => {
    const border = [];
    if (obj.key % 3 !== 0) {
      border.push(styles.borderLeft);
    }
    if (obj.key > 2) {
      border.push(styles.borderTop);
    }
    return <Square value={obj.value} border={border} key={obj.key} onPress={() => console.log('pressed', obj.key)} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        {[{key:0, value: 'O' }, {key:1, value: 'O' }, {key:2, value: 'X' }].map(renderSquare)}
      </View>
      <View style={styles.row}>
        {[{key:3, value: 'X' }, {key:4, value: 'O' }, {key:5, value: 'O' }].map(renderSquare)}
      </View>
      <View style={styles.row}>
        {[{key:6, value: 'X' }, {key:7, value: 'X' }, {key:8, value: 'O' }].map(renderSquare)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0', // F6BD60
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#E6A57E',
  },
  square: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareBox: {
    flex: 1,
    backgroundColor: '#9BC1BC',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0.1,
    shadowColor: '#F6BD60',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.32,
    shadowRadius: 2.22,
  },
  squareText: {
    fontFamily: 'TicTacToe',
    fontSize: 50,
    fontWeight: 'bold',
    color: '#726A95',
    textAlign: 'center',
  },
  borderLeft: {
    borderLeftWidth: 6,
    borderColor: '#726A95',
  },
  borderTop: {
    borderTopWidth: 6,
    borderColor: '#726A95',
  }
});
