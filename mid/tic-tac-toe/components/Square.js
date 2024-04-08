import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

function Square({value, border }) {
  return (
    <View style={[styles.square, border]}>
        <Text style={styles.squareText}>{value}</Text>
      </View>
  );
}

export default function App() {

    // useEffect(() => {
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

        // renderSquare()
    // })
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  square: {
    flex: 1,
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#999',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    alignContent: 'center',
    justifyContent: 'center'
  },
  squareText: {
    alignSelf:'center'
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderColor: '#999'
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: '#999'
  }
});
