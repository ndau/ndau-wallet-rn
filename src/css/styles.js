import { StyleSheet, Platform } from 'react-native';
import * as styleConstants from './styleConstants';

export default StyleSheet.create({
  drawerText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  },
  drawerLabels: {
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Regular'
  },
  drawerContainer: {
    ...Platform.select({
      ios: {
        marginLeft: 20,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15
      },
      android: {
        padding: 15
      }
    }),
    flex: 1,
    backgroundColor: styleConstants.DRAWER_BACKGROUND_COLOR
  },
  darkBackgroundColor: {
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR
  },
  safeContainer: {
    flex: 1,
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR
  },
  container: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Regular'
  },
  textInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    paddingLeft: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4d9678',
    backgroundColor: '#4d9678',
    borderRadius: 3,
    fontFamily: 'TitilliumWeb-Light',
    margin: '0.5%',
    padding: '2px',
    borderRadius: 3
  },
  wizardText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular'
  },
  progress: {
    paddingTop: 8,
    paddingBottom: 8
  },
  dashboardTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dashboardTextLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 28,
    paddingBottom: 10
  },
  dashboardTextSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4d9678',
    fontFamily: 'TitilliumWeb-Light',
    fontSize: 22,
    shadowOpacity: 0.2,
    shadowColor: '#4e957a',
    shadowRadius: 3,
    paddingBottom: 10,
    paddingTop: 10
  },
  checkbox: { flex: 1, paddingTop: 10, paddingBottom: 10 },
  contentContainer: {
    ...Platform.select({
      ios: {
        marginTop: 15
      }
    })
  },
  footer: {
    justifyContent: 'flex-end'
  },
  linkText: {
    color: styleConstants.LINK_ORANGE,
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 18,
    textDecorationLine: 'underline'
  }
});
