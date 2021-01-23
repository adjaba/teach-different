import { StyleSheet } from 'react-native';
import {
  black,
  blue,
  blueTransparent50,
  darkgray,
  gray,
  lightgray,
  orange,
  orangedarker,
  red,
  white,
  yellow,
} from './color-codes';

export const stylesheet = (windowHeight, windowWidth) => {
  return StyleSheet.create({
    /* containerSection */
    container: {
      flex: 5,
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: white,
    },
    scrollContainer: {
      //flex: 20,
      padding: 8,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    paddedContainer: {
      padding: 8,
    },
    alignItemsContent: {
      alignItems: 'center',
    },
    imageBackground: {
      flex: 3,
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      alignSelf: 'center',
      resizeMode: 'cover',
    },
    overlay: {
      flex: 3,
      flexDirection: 'column',
      width: '100%',
      backgroundColor: blueTransparent50, //this is at 50% opacity
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
    },
    /* headerSection */
    headerWrapper: {
      width: '50%',
      padding: 24,
      justifyContent: 'center',
    },
    dashboardHeader: {
      fontFamily: 'Roboto Slab Medium',
      fontSize: 32,
      color: white,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    /* topSection */
    topBar: {
      flex: 1,
      alignSelf: 'stretch',
    },
    topWrapper: {
      flex: 3,
      flexDirection: 'column',
      width: '200%',
      borderBottomLeftRadius: windowWidth,
      borderBottomRightRadius: windowWidth,
      overflow: 'hidden',
    },
    /* button */
    button: {},
    buttonWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      padding: 12,
    },
    buttonLabel: {
      fontFamily: 'Roboto Slab Medium',
      fontSize: 20,
      color: black,
    },
    /* filterSection */
    filterSection: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: blue,
      height: 0.1 * windowHeight,
      width: windowWidth,
    },
    filter: {
      padding: 2,
    },
    textInput: {
      width: 0.483 * windowWidth,
      backgroundColor: white,
      padding: 4,
      color: darkgray,
      borderRadius: 4,
      fontFamily: 'Roboto',
      // flex: 5,
    },
    // Look at style options here: https://www.npmjs.com/package/react-native-alphabet-sectionlist
    /* alphabetSectionStyle */
    alphabetListStyle: {
      // marginTop: 0.0223 * windowHeight,
      alignItems: 'flex-start',
      justifyContent: 'center',
      // flex: 7,
      color: blue,
      height: 0.7 * windowHeight,
    },
    sectionHeader: {
      fontSize: 16,
      color: blue,
      width: windowWidth,
    },
    listItem: {
      alignItems: 'flex-start',
      padding: 10,
      width: 0.93 * windowWidth,
    },
    innerText: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'left',
      color: blue,
      fontSize: 16,
      // marginRight: 0.0241 * windowWidth,
    },
    /* text */
    title: {
      marginTop: 18,
      marginHorizontal: 10,
      marginBottom: 0,
      fontSize: 30,
      fontFamily: 'Roboto Slab Medium',
      color: darkgray,
      // textAlign: 'left',
      // color: blue,
      textAlign: 'center',
    },
    subtitle: {
      marginHorizontal: 10,
      marginBottom: 0,
      fontSize: 22,
      fontFamily: 'Roboto',
      color: darkgray,
      textAlign: 'left',
      // color: blue,
    },
    paragraph: {
      margin: 10,
      fontSize: 17,
      fontFamily: 'Roboto',
      color: darkgray,
      textAlign: 'left',
      flexWrap: 'wrap',
      //   color: blue,
      alignSelf: 'stretch',
    },
    caption: {
      marginHorizontal: 10,
      fontSize: 16,
      fontFamily: 'Roboto',
      color: gray,
      textAlign: 'left',
      flexWrap: 'wrap',
      alignSelf: 'stretch',
    },
    quote: {
      margin: 10,
      color: darkgray,
      textAlign: 'center',
      fontFamily: 'Roboto Slab Medium',
      fontSize: 22,
    },
    /* image */
    image: {
      width: windowWidth - 50,
      height: ((windowWidth - 50) * 471) / 870,
      marginVertical: 8,
      //need to figure out how to resize based on shape of photo
      //now it worky i hope
      //aaaa but now i need to find image width and height
      // yo is this fixed yet? -Karen
    },
    /* labels and group */
    labels: {
      color: blue,
      fontSize: 19,
      fontFamily: 'Roboto Slab Medium',
      textAlign: 'left',
    },
    group: {
      flexDirection: 'column',
      //   justifyContent: 'flex-start',
      //   alignItems: 'flex-start',
    },
    /* stepsStyles */
    stepTitle: {
      color: white,
      textAlign: 'left',
      fontSize: 17,
      margin: 10,
      marginBottom: 0,
      fontFamily: 'Roboto',
    },
    step: {
      flex: 1,
      marginHorizontal: 10,
      alignSelf: 'stretch',
    },
    stepOne: {
      backgroundColor: orangedarker,
      marginTop: 10,
    },
    stepTwo: { backgroundColor: red },
    stepThree: { backgroundColor: blue },
    /* videoStyles */
    videoCard: {
      margin: 10,
      marginBottom: 20,
      backgroundColor: orange,
      borderRadius:5,
    },
    video: {
      width: windowWidth - 20,
      maxHeight: ((windowWidth - 20) * 9) / 16,
      //flex: 0,
      //need to figure out how to resize based on shape of photo
      //now it worky i hope
      //aaaa but now i need to find image width and height
    },
    videoTitle: {
      color: black,
      textAlign: 'center',
      fontSize: 17,
      padding: 10,
      fontFamily: 'Roboto',
    },
    /* bullets */
    // bullets and bulletPoints need to be the same size
    bullets: {
      color: black,
      textAlign: 'left',
      fontSize: 17,
      paddingVertical: 8,
      marginLeft: 20,
      marginRight: 10,
      fontFamily: 'Roboto',
    },
    bulletPoints: {
      fontFamily: 'Roboto',
      fontSize: 17,
      marginHorizontal: 10,
      marginVertical: 10,
    },
    /* appBar */
    appBar: {
      backgroundColor: blue,
    },
    /* card */
    card: {
      width: windowWidth,
      //height: 0.6*windowHeight, // Change the first number as needed
      paddingVertical: 12,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      //shadowColor: black,
      //Did we get all the styles elements we need incorporated here? Please check the list of acceptable style props
      // and how this looks on different sized devices.
      // imageWidth: 50,
      // imageHeight: 50,
      // imageMargin: 60,
      // paddingBottom: 100,
      // height: 200,
      // marginTop: 5,
      // marginBottom: 90,
      // shadowColor: "black"
    },
    cardImage: {
      width: windowWidth,
      height: 0.5 * windowHeight, // Change the first number as needed
      marginTop: 10,
    },
    /* conversationMapTitle */
    conversationMapTitle: {
      color: white,
      fontSize: 24,
      fontFamily: 'Roboto',
    },
  });
};
