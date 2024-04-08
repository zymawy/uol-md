import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
const { width } = Dimensions.get('window');
const buttonWidth = width / 4;

export default function App() {
	const [answerValue, setAnswerValue] = useState('0');
	const [memoryValue, setMemoryValue] = useState(null);
	const [operatorValue, setOperatorValue] = useState(null);
	const [readyToReplace, setReadyToReplace] = useState(true);
	const [defaultOperator, setDefaultOperator] = useState(['+', '-', '*', '/', '=']);
	const [levelOperator, setLevelOperator] = useState(['C', '+/-', '%',]);

	const buttonPressed = (value) => {
		if (typeof value === 'number' || value === '.') {
			handleNumber(String(value));
		} else {
			switch (value) {
				case 'C':
					setAnswerValue('0');
					setMemoryValue(null);
					setOperatorValue(null);
					setReadyToReplace(true);
					break;
				case '+/-':
					setAnswerValue(String(parseFloat(answerValue) * -1));
					break;
				case '%':
					setAnswerValue(String(parseFloat(answerValue) / 100));
					break;
				case '=':
					calculateEquals();
					break;
				default: // '+' or '-' or '*' or '/'
					// If there's an existing operator, calculate the result first
					if (operatorValue && !readyToReplace) {
						calculateEquals();
					}
					setMemoryValue(answerValue);
					setOperatorValue(value);
					setReadyToReplace(true);
					break;
			}
		}
	};

	const handleNumber = (num) => {
		setAnswerValue((prevValue) => {
			// If ready to replace (e.g., after pressing an operator), replace the current answer; otherwise, append
			if (readyToReplace) {
				setReadyToReplace(false);
				return num === '.' ? '0.' : num; // Handle decimal point edge case
			} else {
				// Prevent multiple leading zeros and multiple decimal points
				if (prevValue === '0' && num === '0') {
					return prevValue;
				} else if (prevValue === '0' && num !== '.') {
					return num;
				} else if (num === '.' && prevValue.includes('.')) {
					return prevValue;
				} else {
					return prevValue + num;
				}
			}
		});
	};

	const calculateEquals = () => {
		const previous = parseFloat(memoryValue);
		const current = parseFloat(answerValue);
		let newAnswer = '';

		switch (operatorValue) {
			case '+':
				newAnswer = previous + current;
				break;
			case '-':
				newAnswer = previous - current;
				break;
			case '*':
				newAnswer = previous * current;
				break;
			case '/':
				newAnswer = previous / current;
				break;
		}

		setAnswerValue(String(newAnswer));
		setMemoryValue(null);
		setOperatorValue(null);
		setReadyToReplace(true);
	};

	const renderButton = (value, style, textStyle) => (
		<TouchableOpacity
			key={value}
			style={[styles.button, style]}
			onPress={() => buttonPressed(value)}>
			<Text style={[styles.buttonText, textStyle]}>{value}</Text>
		</TouchableOpacity>
	);

	const checkState = (value) => {

		if (defaultOperator.includes(value)) {
			return true;
		}

		return false;
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" />
			<Text style={styles.resultText}>{answerValue}</Text>
			<View style={styles.row}>
				{['C', '+/-', '%', '/'].map((value) => renderButton(value,
					value === '/' ?
							styles.operatorButton :
						( levelOperator.includes(value) ? styles.levelOperator : {})
					)
				)}
			</View>
			<View style={styles.row}>
				{[ 7, 8, 9, '*'].map((value) => renderButton(value,   checkState(value)? styles.operatorButton : {}))}
			</View>
			<View style={styles.row}>
				{[ 4, 5, 6, '-'].map((value) => renderButton(value,  checkState(value) ? styles.operatorButton : {}))}
			</View>
			<View style={styles.row}>
				{[ 1, 2, 3, '+'].map((value) => renderButton(value,  checkState(value)? styles.operatorButton : {}))}
			</View>
			<View style={styles.row}>
				{[ 0, '.', '='].map((value) => renderButton(value,
					checkState(value) ?
							styles.operatorButton :
						((value === 0) ? styles.zeroStyle : {})
				))}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		justifyContent: 'flex-end',
	},
	resultText: {
		color: 'white',
		fontSize: 80,
		margin: 20,
		textAlign: 'right',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		backgroundColor: '#333333',
		margin: 10,
		width: buttonWidth - 20,
		height: buttonWidth - 20,
		borderRadius: (buttonWidth - 20) / 2,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#F6BD60'
	},
	operatorButton: {
		backgroundColor: '#0884E3',
	},
	buttonText: {
		fontSize: 30,
	},
	zeroStyle: {flex: 2, alignItems: 'right', paddingLeft: 20 },
	levelOperator: { backgroundColor: '#A6A6A6', color: 'black' }
});
