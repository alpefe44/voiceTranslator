import { View, Text, FlatList, Pressable, Alert, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import React from 'react'
import data from './src/data'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, FadeIn, withRepeat } from 'react-native-reanimated'
import Tts from 'react-native-tts'
import { translateText } from './src/api/api'



const { width, height } = Dimensions.get('screen');

const App = () => {

  const rotate = useSharedValue(0);
  const opacity = useSharedValue(2)

  const [language, setLanguage] = React.useState("")
  const [value, setValue] = React.useState("")
  const [translateValue, setTranslateValue] = React.useState("")

  const animationStyleRotate = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value * 360}deg` }],
  }))

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  React.useEffect(() => {
    rotate.value = withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.circle) })
    opacity.value = 0
  }, [language])

  const showItem = async (item) => {
    if (item === "Türkçe") {
      Tts.setDefaultLanguage('tr-TR');
      setLanguage("Türkçe")
      await translateText(value, "tr")
        .then((response) => {
          Tts.speak(response)
          setTranslateValue(response)
          opacity.value = withTiming(1, { duration: 1000 , easing : Easing.inOut(Easing.cubic) })
        })
        .catch((error) => console.log(error))
    }
    if (item === "İngilizce") {
      Tts.setDefaultLanguage('en-US');
      setLanguage("İngilizce")
      await translateText(value)
        .then((response) => {
          Tts.speak(response)
          setTranslateValue(response)
          opacity.value = withTiming(1, { duration: 1000 , easing : Easing.inOut(Easing.cubic) })
        })
        .catch((error) => console.log(error))
    } if (item === "Portekizce") {
      Tts.setDefaultLanguage('pt-BR');
      setLanguage("Portekizce")
      await translateText(value, "pt")
        .then((response) => {
          Tts.speak(response)
          setTranslateValue(response)
          opacity.value = withTiming(1, { duration: 1000 , easing : Easing.inOut(Easing.cubic) })
        })
        .catch((error) => console.log(error))
    }
  }


  const renderItem = ({ item, index }) => {
    return (
      <Animated.View entering={FadeIn.duration(500 * index).easing(Easing.ease)} style={[{ paddingHorizontal: 10, paddingVertical: 10, margin: 10, alignItems: 'center', justifyContent: 'center', }, animationStyleRotate]}>
        {
          value.length <= 0 ?

            <View>
              <Image style={{ width: 50, height: 50, resizeMode: 'cover', borderWidth: language == item.language ? 5 : 0, borderColor: 'black', borderRadius: 40 }} source={{ uri: `${item.image}` }}></Image>
            </View>
            :
            (
              <TouchableOpacity onPress={() => showItem(item.language)}>
                <Image style={{ width: 50, height: 50, resizeMode: 'cover', borderWidth: language == item.language ? 5 : 0, borderColor: 'black', borderRadius: 40 }} source={{ uri: `${item.image}` }}></Image>
              </TouchableOpacity>
            )
        }

      </Animated.View >
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ height: height * .2 }}>
          <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', elevation: 10, color: 'black', fontSize: 26 }}>Voice Translator</Text>
        </View>
        <View style={{ width: '100%' }}>
          <TextInput value={value} onChangeText={(text) => setValue(text)} placeholder='Text girin...' multiline style={{ padding: 15, borderWidth: .3, marginHorizontal: 15 }}></TextInput>
        </View>

        <Animated.View style={{ backgroundColor: 'white', padding: 5 }}>
          <Animated.Text style={[{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }, opacityStyle]}>{translateValue}</Animated.Text>
        </Animated.View>

        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={3}
        />
      </View>
    </View>
  )
}

export default App