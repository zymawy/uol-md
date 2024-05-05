import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Section, TableView, Cell } from 'react-native-tableview-simple';

const Stack = createStackNavigator();
const ITEMS = [
	{ 
		id: 1,
		title: "Joe's Gelato",
		tagline: "Desert, Ice cream, £££",
		eta: "10-30",
		image: require('./assets/images/food-1.jpeg'),
		items: 
		[{ 
			"title":"Gelato", 
			"contents":[{"title":"Vanilla", "isInStock": true}, {"title":"Chocolate", "isInStock": false}, {"title":"Mint", "isInStock": true}],
	
		},
		{ "title":"Coffee", "contents":[
			{"title":"Flat white", "isInStock": true},
			{"title":"Latte", "isInStock": true},
			{"title":"Caffe` Americano", "isInStock": false}
		] }
		]
	},
	{ 
		id: 2,
		title: "Joe's Gelato",
		tagline: "Desert, Ice cream, £££",
		eta: "10-30",
		image: require('./assets/images/food-2.jpeg'),
		items: 
		[{ 
			"title":"Gelato", 
			"contents":[
				{"title":"Vanilla", "isInStock": true}, 
				{"title":"Chocolate", "isInStock": false}, 
				{"title":"Mint", "isInStock": true}
			] 
		},
		{ "title":"Coffee", "contents":[
			{"title":"Flat white", "isInStock": true},
			{"title":"Latte", "isInStock": false},
			{"title":"Caffe` Americano", "isInStock": true}
		] }
		]
	}
]
function MenuItemDetail({ route }) {
	const { item } = route.params;
  
	return (
	  <View style={styles.detailContainer}>
		<Text style={styles.detailTitle}>{item.title}</Text>
		{/* Display item image and out of stock status if necessary */}
		{item.isInStock ? (
		  <Image source={item.image} style={styles.detailImage} />
		) : (
		  <Text style={styles.outOfStockText}>Out of Stock</Text>
		)}
	  </View>
	);
  }

function Restaurants({ navigation }) {
	return (
		<ScrollView>
			<TableView>
				<Section name="" hideSeparator={true} separatorTintColor={'#ccc'}>
					{ITEMS.map((restaurant) => {
						return (
							<HomescreenCell key={restaurant.id}
							action={() => navigation.navigate('Menu', {items: restaurant.items})}
							{...styles.homescreen}
							title={restaurant.title}
							tagline={restaurant.tagline}
							eta={restaurant.eta}
							imgUri={restaurant.image}
							/>
						)
					})}
				</Section>
			</TableView>
		</ScrollView>
	);
}

// https://stackoverflow.com/a/8084248/6531160
function randomKey() {
	return (Math.random() + 1).toString(36).substring(7);
}


function Menu({ route, navigation }) {
	const { items } = route.params;
  
	const renderItemContent = (content) => {
	  if (content.isInStock) {
		// Return a Cell component for in-stock items
		return (
		  <Cell
			title={content.title}
			key={content.title}
			onPress={() => handleMenuItemPress(content)}
			// image={content.image} // Assuming your Cell component can display an image
		  />
		);
	  } else {
		// Return a Cell component styled for out-of-stock items
		return (
		  <Cell
			title={`${content.title} (Out of Stock)`}
			key={content.title}
			style={styles.outOfStockCell}
			backgroundColor='#cccccc'
			isDisabled={true}
			cellImageView={content.image} // Assuming your Cell component can display an image
			// Add additional styling if necessary
		  />
		);
	  }
	};
  
	const handleMenuItemPress = (item) => {
	  // Perform the action when a menu item is pressed
	  // For now, let's just show an alert
	  if (item.isInStock) {
		navigation.navigate('MenuItemDetail', { item });
	  } else {
		// Handle out-of-stock condition, e.g., show a message.
		alert('This item is currently out of stock.');
	  }
	};
  
	return (
	  <ScrollView>
		<TableView>
		  {items.map((item, sectionIndex) => (
			<Section header={item.title} key={sectionIndex}>
			  {item.contents.map(renderItemContent)}
			</Section>
		  ))}
		</TableView>
	  </ScrollView>
	);
  }

// function Menu({ route, navigation }) {
// 	const { items } = route.params;

// 	// const handleMenuItemPress = (item) => {
// 	// 	if (item.isInStock) {
// 	// 	  navigation.navigate('MenuItemDetail', { item });
// 	// 	} else {
// 	// 	  // Handle out-of-stock condition, e.g., show a message.
// 	// 	  alert('This item is currently out of stock.');
// 	// 	}
// 	//   };

// 	const itemContent = (content) => {
// 		if(content.isInStock) {
// 			return (
// 				<Cell
// 				  title={content.title}
// 				  key={content.title}
// 				  onPress={() => handleMenuItemPress(content)}
// 				  image={content.image} // Make sure your Cell component can accept and display an image
// 				/>
// 			  );
// 		} else {
// 			return (
// 				<Cell
// 				  title={content.title + ' (Out of Stock)'}
// 				  key={content.title}
// 				  style={styles.outOfStockCell}
// 				  image={content.image} // Image for out-of-stock items, could be greyed out
// 				/>
// 			  );
// 		}
// 	}
// 	return (
// 		<ScrollView>
// 			<TableView>
// 				{items.map((item) => {
// 					return (
// 						<Section header={item.title}>
// 						console.log(item.contents);
// 						{item.contents.map((content) => {
// 							return (
// 							<Cell title={content.title} key={randomKey()}>	
// 							</Cell>
// 							)
// 							})
// 						}
// 						</Section>
// 					)
// 				})}
// 			</TableView>
// 		</ScrollView>
// 	);
// }

function HomescreenCell( props) {
	return (
		<Cell
		backgroundColor='#ccc'
	
		{...props}
		onPress={props.action}
		cellContentView={
			<View style={{flex: 1}}>
				<Image source={props.imgUri} style={styles.coverImage}  />
					<View style={styles.etaContainer}>
						<Text style={styles.eta}>
							{props.eta} {'\n mins'}
						</Text>
					</View>
					<View style={{flex: 1}}>
					<Text style={styles.title }>{props.title}</Text>
					<Text style={styles.tagline}>{props.tagline}</Text>
					</View>
			</View>
		}
		/>
	)
}

export default function App() {
  return (
    <NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="Restaurants" component={Restaurants} />
			<Stack.Screen name="Menu" component={Menu} />
			<Stack.Screen name="MenuItemDetail" component={MenuItemDetail} />
		</Stack.Navigator>
	</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	    backgroundColor: '#f8f8f8', // A light background color for a modern look

  },
  coverImage: {
	flex: 1,
	width: null,
	height: 230,
	resizeMode: 'contain',
	justifyContent: 'center'
  },
  etaContainer: {
	borderRadius: 30,
	backgroundColor: 'white',
	padding: 11,
	position: 'absolute',
    bottom: 0,
	right:0,
	marginBottom: 50
  },
  eta: {
	fontSize: 11,
	fontWeight: 'bold',
  },
  title: {
	fontSize: 14,
	fontWeight: 'bold',
	color:"black",
	marginBottom: 2
  },
  tagline: {
	marginBottom: 10,
	color: "gray",
	paddingTop: 10
  },
  homescreen: {
	height:'190px',
	backgroundColor:'#ccc',
	color:'#ccc'
  },
  outOfStockCell: {
    // Style for out-of-stock items
    opacity: 0.5, // Make the cell look faded
    // Other styles to indicate the item is not available
	backgroundColor: '#cccccc', 
  },
  detailContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  outOfStockText: {
    color: 'red',
    fontSize: 18,
  },
});
