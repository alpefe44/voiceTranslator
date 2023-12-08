import axios from 'axios';

//AIzaSyATAr2VPZugwXQoIUfxDUvjoUIvtzN4YNg
const API_KEY = 'AIzaSyATAr2VPZugwXQoIUfxDUvjoUIvtzN4YNg';
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

export const translateText = async (text, targetLanguage = 'en') => {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        q: text,
        target: targetLanguage,
      }
    );

    console.log(response.data.data.translations[0].translatedText)
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};