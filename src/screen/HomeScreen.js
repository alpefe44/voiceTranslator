import { View, Text, FlatList, Pressable, Alert, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import React from 'react'
import data from '../data'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, FadeIn, withRepeat, BounceIn, BounceInDown, withDelay } from 'react-native-reanimated'
import Tts from 'react-native-tts'
import { translateText } from '../api/api'
import { useSelector, useDispatch } from 'react-redux'
import { addData } from '../redux/slice'



const { width, height } = Dimensions.get('screen');

const HomeScreen = () => {

    const dispatch = useDispatch();


    const rotate = useSharedValue(0);
    const opacity = useSharedValue(0)

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
        console.log("useeffect aktif")
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
                    opacity.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.cubic) })
                    dispatch(addData({
                        word: value,
                        translation: response
                    }))
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
                    opacity.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.cubic) })
                    dispatch(addData({
                        word: value,
                        translation: response
                    }))
                })
                .catch((error) => console.log(error))
        } if (item === "Portekizce") {
            Tts.setDefaultLanguage('pt-BR');
            setLanguage("Portekizce")
            await translateText(value, "pt")
                .then((response) => {
                    Tts.speak(response)
                    setTranslateValue(response)
                    opacity.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.cubic) })
                    dispatch(addData({
                        word: value,
                        translation: response
                    }))
                })
                .catch((error) => console.log(error))
        }
        if (item === "Almanca") {
            Tts.setDefaultLanguage('pt-BR');
            setLanguage("Almanca")
            await translateText(value, "de")
                .then((response) => {
                    Tts.speak(response)
                    setTranslateValue(response)
                    opacity.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.cubic) })
                    dispatch(addData({
                        word: value,
                        translation: response
                    }))
                })
                .catch((error) => console.log(error))
        }
        if (item === "İspanyolca") {
            Tts.setDefaultLanguage('pt-BR');
            setLanguage("İspanyolca")
            await translateText(value, "es")
                .then((response) => {
                    Tts.speak(response)
                    setTranslateValue(response)
                    opacity.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.cubic) })
                    dispatch(addData({
                        word: value,
                        translation: response
                    }))
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
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center' }}>
                <Animated.View entering={BounceIn.duration(800)} style={{ height: height * .3, alignItems: 'center', gap: 10 }}>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'black', fontSize: 26 }}>Voice Translator</Text>
                    <Image style={{ height: 100, width: 100 }} source={{ uri: "https://img.pixers.pics/pho_wat(s3:700/FO/45/64/30/91/700_FO45643091_4099d6cd098350638d3624d316498241.jpg,663,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,443,650,jpg)/cikartmalar-vektor-klasik-mikrofon.jpg.jpg" }}></Image>
                </Animated.View>
                <View style={{ width: '100%' }}>
                    <TextInput value={value} onChangeText={(text) => setValue(text)} placeholder='Text girin...' multiline style={{ padding: 15, borderWidth: .3, marginHorizontal: 15 }}></TextInput>
                </View>

                <Animated.View style={{ backgroundColor: 'white', marginVertical: 20 }}>
                    <Animated.Text style={[{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }, opacityStyle]}>{translateValue.toUpperCase()}</Animated.Text>
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

export default HomeScreen