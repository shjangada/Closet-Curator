import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginScreen() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.weatherInfo}>
        <Image source={require('@/assets/images/recommendations/rain.png')} style={styles.weatherImg} resizeMode="contain" />
        <Text style={styles.weatherText}>
        67° F
        It’s raining!!
        </Text>
      </View>
      <View style={styles.clothesRecs}>
        <Image source={require('@/assets/images/pant3.png')} style={styles.clothingItem} resizeMode="contain" />
        <Image source={require('@/assets/images/hoodie.png')} style={styles.clothingItem} resizeMode="contain" />
      </View>
      <View style={styles.descTextContainer}>
        <Text style={styles.descText}>
        Good morning! It's raining steadily today with cool temperatures, so I'd recommend wearing a hoodie to stay warm and dry while you're out.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    descTextContainer: {
        alignItems: "center",
        paddingBottom: 100,
        paddingHorizontal: 16,
    },
    clothesRecs: {
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        gap: 14,
    },
    descText: {
        color: "white",
        fontSize: 25,
        alignSelf: "center",
    },
screenContainer: {
    paddingTop: 100,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: '#0c0b32',
    flex: 1,
  },
  weatherInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  titleText: {
    color: "white",
    fontSize: 15,
    
  },
  titleText2: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    
  },
  weatherText: {
    color: "white",
    fontSize: 25,
    marginBottom: 20,
    alignSelf: "center",
  },
  clothingItem: {
    width: '40%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  weatherImg: {
    width: '30%',
    height: 200,
    borderRadius: 10,
  },
  
  
});
