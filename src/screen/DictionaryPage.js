import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Animated, { BounceInLeft } from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');

const DictionaryPage = () => {

  const words = useSelector((state) => state.dataSlice.data)
  console.log(words, "dicpage")


  const chooseImage = (language) => {

    switch (language) {
      case "Türkçe":
        return <Image style={{ height: 30, width: 30, alignSelf: 'center' }} source={{ uri: "https://w7.pngwing.com/pngs/181/192/png-transparent-round-turkey-flag-illustration-flag-of-turkey-anatolia-english-national-emblem-of-turkey-turkey-flag-miscellaneous-logo-national-emblem.png" }}></Image>
      case "İngilizce":
        return <Image style={{ height: 30, width: 30, alignSelf: 'center' }} source={{ uri: "https://w7.pngwing.com/pngs/666/76/png-transparent-flag-of-the-united-states-national-flag-usa-flag-flag-logo-united-states-thumbnail.png" }}></Image>
      case "Portekizce":
        return <Image style={{ height: 30, width: 30, alignSelf: 'center' }} source={{ uri: "https://w7.pngwing.com/pngs/569/786/png-transparent-round-green-red-and-yellow-shield-logo-flag-of-portugal-desktop-flag-of-canada-portugal-miscellaneous-flag-computer-thumbnail.png" }}></Image>
      case "Almanca":
        return <Image style={{ height: 30, width: 30, alignSelf: 'center' }} source={{ uri: "https://w7.pngwing.com/pngs/894/743/png-transparent-flag-of-germany-east-germany-flag-miscellaneous-flag-germany-thumbnail.png" }}></Image>
      case "İspanyolca":
        return <Image style={{ height: 30, width: 30, alignSelf: 'center' }} source={{ uri: "https://w7.pngwing.com/pngs/288/791/png-transparent-flag-of-spain-flag-of-spain-flag-of-the-united-states-national-flag-spain-flags-icon-miscellaneous-flag-spanish-thumbnail.png" }}></Image>

      default:
        break;
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <View>
        {
          words.map((item, index) => {
            const { word, translation, language } = item;
            return (
              <Animated.View entering={BounceInLeft} style={{ height: height * .13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', elevation: 10, borderWidth: .1, margin: 10, paddingHorizontal: 10 }}>
                <Text style={styles.text}>{word.toUpperCase()}</Text>
                {
                  chooseImage(language)
                }
                <Text style={styles.text}>{translation.toUpperCase()}</Text>
              </Animated.View>
            )

          })
        }
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    width: width * .3
  }
})

export default DictionaryPage