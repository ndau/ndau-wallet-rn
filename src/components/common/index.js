/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  ScrollView,
  RefreshControl,
  Switch,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Progress, H4, P, Checkbox, Input, RadioGroup} from 'nachos-ui';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import AppConstants from '../../AppConstants';
import QRCode from 'react-native-qrcode-svg';
// It would be ideal to use the below library as it is faster. However
// there seemed to be an issue with how it creates a black border. Even padding
// the qr with a white border does not help. The react-native-custom-qr-codes is slow
// on old android devices. I think we might get complaints.
// The issue tracking the slow performance of react-native-custom-qr-codes is
// https://github.com/nating/react-native-custom-qr-codes/issues/14
// import QRCode from 'react-native-qrcode-svg'
import Spinner from 'react-native-loading-spinner-overlay';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-fontawesome-pro';
import {
  Camera,
  useCameraDevices,
  useIsAppForeground,
} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';

export function KeyboardScroller(props) {
  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        {props.children}
        <View style={{height: Platform.OS === 'ios' ? 90 : 20}} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function LoginContainer({children}) {
  return (
    <MainContainer>
      <FullScreenTripColorGradient>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.loginContainer}>{children}</View>
        </ScrollView>
      </FullScreenTripColorGradient>
    </MainContainer>
  );
}

export function TextLink(props) {
  return (
    <H4
      onPress={() => Linking.openURL(props.url)}
      style={[styles.greenLinkText, props.textStyle]}>
      {props.children}
    </H4>
  );
}

export function ModalTextLink(props) {
  return (
    <Text
      onPress={() => Linking.openURL(props.url)}
      style={styles.greenLinkTextForModal}>
      {props.children}
    </Text>
  );
}

export function SmallButtonText(props) {
  return (
    <P style={[styles.smallButtonText]} {...props}>
      {props.children}
    </P>
  );
}

export function SmallParagraphText(props) {
  return (
    <P style={[styles.smallParagraphText]} {...props}>
      {props.children}
    </P>
  );
}

export function FullScreenTripColorGradient(props) {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.2}}
      end={{x: 0.5, y: 1.0}}
      locations={[0, 0.5037, 1.0]}
      colors={[
        AppConstants.FULL_SCREEN_GRADIENT_START_COLOR,
        AppConstants.FULL_SCREEN_GRADIENT_MID_COLOR,
        AppConstants.FULL_SCREEN_GRADIENT_END_COLOR,
      ]}
      style={[styles.opaqueOverlay]}>
      {props.children}
    </LinearGradient>
  );
}

export function FullScreenDualColorGradient(props) {
  return (
    <LinearGradient
      locations={[0, 1.0]}
      colors={[
        AppConstants.FULL_SCREEN_DUAL_COLOR_GRADIENT_START_COLOR,
        AppConstants.FULL_SCREEN_DUAL_COLOR_GRADIENT_START_COLOR,
      ]}
      style={[styles.appContainerOverlay, props.style]}>
      {props.children}
    </LinearGradient>
  );
}

export function LargeButtons(props) {
  let sideMargins = {};
  if (props.sideMargins) {
    sideMargins = styles.largeButtonMargin;
  }
  return (
    <View
      style={
        props.bottom
          ? props.secondary
            ? styles.setupButtonContainerBottom
            : styles.setupButtonContainerBottomNoBorder
          : styles.setupButtonContainerTop
      }>
      {props.text ? <SmallButtonText>{props.text}</SmallButtonText> : null}
      <Button
        style={
          props.secondary
            ? [styles.largeButtonSecondary, sideMargins]
            : [styles.largeButton, sideMargins]
        }
        textStyle={styles.largeButtonText}
        uppercase={false}
        {...props}>
        {props.children}
      </Button>
    </View>
  );
}

export function LargeButton(props) {
  const sideMargins = props.sideMargins ? styles.largeButtonMargin : {};

  return (
    <View
      style={[
        props.scroll
          ? styles.setupButtonContainerScrollView
          : styles.setupButtonContainerBottomNoBorder,
        props.buttonStyle,
      ]}>
      <Button
        style={[
          props.isNegative ? styles.largeButtonNegative : styles.largeButton,
          sideMargins,
          props.style,
        ]}
        textStyle={[
          props.isNegative
            ? styles.largeButtonTextNegative
            : styles.largeButtonText,
          props.style,
        ]}
        uppercase={false}
        {...props}>
        {props.children}
      </Button>
    </View>
  );
}

export function LargeBorderButton(props) {
  return (
    <View>
      <Button
        style={[styles.largeBorderButton, props.style]}
        textStyle={[styles.largeButtonText, props.style]}
        uppercase={false}
        {...props}>
        {props.children}
      </Button>
    </View>
  );
}

export function BottomLinkText(props) {
  return (
    <View style={[styles.centeredLinkContainer]}>
      <H4 {...props} style={styles.centeredLinkText}>
        {props.children}
      </H4>
    </View>
  );
}

export function LinkText(props) {
  return (
    <View style={[styles.linkContainer]}>
      <H4 {...props} style={[styles.linkText]}>
        {props.children}
      </H4>
    </View>
  );
}

export function PasswordLinkContainer(props) {
  return <View style={[styles.passwordLinkContainer]}>{props.children}</View>;
}

export function PasswordLinkText(props) {
  return (
    <H4
      onPress={props.onPress}
      style={[styles.linkText, styles.authenticationLinkText]}>
      {props.children}
    </H4>
  );
}

export function DollarTotal(props) {
  return (
    <View style={[styles.dollarTotalContainer]}>
      <Text {...props} style={[styles.ndauTotalText]}>
        {props.children}
      </Text>
    </View>
  );
}

export function NdauTotal(props) {
  return (
    <View style={[styles.ndauTotalContainer, props.containerStyle]}>
      <Text style={[styles.ndauLarge, props.textStyle]}>n</Text>
      <Text {...props} style={[styles.ndauTotalText, props.textStyle]}>
        {props.children}
      </Text>
    </View>
  );
}

const SETUP_SCREEN_TOTAL = 19;

export function ProgressBar(props) {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.backArrow}>
        <Icon
          size={32}
          name="arrow-left"
          color={AppConstants.ICON_BUTTON_COLOR}
          onPress={props.goBack}
          type="light"
        />
      </View>
      <Progress
        progress={props.pageNumber ? props.pageNumber / SETUP_SCREEN_TOTAL : 0}
        color={AppConstants.PROGRESS_BAR_COLOR}
        style={styles.progressBar}
        width={240}
        height={8}
      />
      <H4 style={[styles.progressNumber]}>
        {props.pageNumber
          ? Math.round((props.pageNumber / SETUP_SCREEN_TOTAL) * 100)
          : '0'}
        %
      </H4>
    </View>
  );
}

export function LabelWithTextLink(props) {
  return (
    <View style={[styles.labelWithTextLinkContainer]}>
      <Text style={[styles.labelShadowText, props.textStyle]}>
        {props.label}
        <TextLink url={props.url} textStyle={props.textStyle}>
          {props.linkText || 'spendable'}
        </TextLink>
      </Text>
    </View>
  );
}

export function LabelWithIcon(props) {
  const margin = props.noMargin ? {} : styles.labelTextMarginRight;
  return (
    <TouchableOpacity
      {...props}
      disabled={!props.textClickable}
      style={[styles.labelWithIconContainer, props.style]}>
      <P style={[styles.labelText, margin, props.textStyle]}>
        {props.children}
      </P>
      {/* <Icon
        size={props.iconSize || 24}
        name={props.fontAwesomeIconName}
        color={AppConstants.ICON_BUTTON_COLOR}
        type='light'
        {...props}
      /> */}
    </TouchableOpacity>
  );
}

export function Label(props) {
  let margin = {};
  if (!props.noMargin) {
    margin = styles.labelTextMarginRight;
  }
  return (
    <P style={[styles.labelText, margin]} {...props}>
      {props.children}
    </P>
  );
}

/**
 * This is a homegrown button as opposed to using nachosui. The reason
 * here is that they way nachosui inserts Icon objects does not allow
 * customization. You can change the fontset but the button doesn't call
 * the Icon correctly to pass in the name of the icon. It uses a hardcoded
 * map of name to unicode characters. These unicode characters do not line
 * up to the FontAwesomePro5 set.
 *
 * @param {Object} props
 */
export function CheckBox(props) {
  const {activeOpacity, disabled, checkComponent, checked, onValueChange} =
    props;

  const isChecked = checked || false;
  return (
    <View style={[{flexDirection: 'row'}, disabled ? disabledStyle : {}]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={props.scroll ? styles.checkboxInScrollView : styles.checkbox}
        onPress={() => onValueChange(!checked)}
        {...props}>
        {isChecked && !checkComponent && (
          <Icon
            color={AppConstants.TEXT_COLOR}
            name="check"
            size={18}
            type="light"
          />
        )}
        {isChecked && checkComponent}
      </TouchableOpacity>
      <P style={[styles.checkboxLabel]} {...props}>
        {props.label}
      </P>
    </View>
  );
}

export function RadioButton(props) {
  return (
    <RadioGroup
      style={styles.radioButton}
      textStyle={styles.checkboxLabel}
      direction="column"
      {...props}
    />
  );
}

export function LegalText(props) {
  return (
    <P style={[styles.legalText]} {...props}>
      {props.children}
    </P>
  );
}

export function LegalTextHeading(props) {
  return (
    <P style={[styles.legalTextHeading]} {...props}>
      {props.children}
    </P>
  );
}

export function MainLegalTextHeading(props) {
  return (
    <P style={[styles.mainLegalTextHeading]} {...props}>
      {props.children}
    </P>
  );
}

export function LegalTextBold(props) {
  return (
    <P style={[styles.legalTextBold]} {...props}>
      {props.children}
    </P>
  );
}

export function AppContainer(props) {
  return (
    <MainContainer>
      <View style={{flex: 1}}>
        <LinearGradient
          start={{x: 0.0, y: 0.1}}
          end={{x: 0.0, y: 1.0}}
          locations={[0, 0.18]}
          colors={['#0A1724', '#0F2748']}
          style={[styles.appContainerOverlay]}>
          <View style={styles.appContainer}>{props.children}</View>
        </LinearGradient>
      </View>
    </MainContainer>
  );
}

export function TextInput(props) {
  const stylesArray = [styles.input];
  if (!props.noBottomMargin) {
    stylesArray.push(styles.inputBottomMargin);
  }
  if (!props.noSideMargins) {
    stylesArray.push(styles.inputSideMargins);
  }
  if (props.error) {
    stylesArray.push(styles.inputErrorBorder);
  }
  if (props.style) {
    stylesArray.push(props.style);
  }
  return (
    <Input
      style={stylesArray}
      placeholderTextColor="#858688"
      autoCapitalize="none"
      {...props}
    />
  );
}

export function BarBorder(props) {
  return <View style={styles.barBorder} />;
}

export function CollapsibleBarBorder(props) {
  return <View style={styles.collapsibleBarBorder} />;
}

export function FullBarBorder(props) {
  return (
    <View
      style={[
        styles.fullBarBorder,
        props.marginBottom ? styles.fullBarBorderBottomWidth : {},
      ]}
    />
  );
}

export function DrawerBorder(props) {
  return <View style={styles.drawerBorder} />;
}

export function OrBorder(props) {
  return (
    <View style={styles.orBorderPanel}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.orBorder} />
        <View>
          <H4 style={styles.orBorderText}>OR</H4>
        </View>
        <View style={styles.orBorder} />
      </View>
    </View>
  );
}

export function MainContainer(props) {
  return (
    <SafeAreaView style={[styles.container, styles.statusBarColor]}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1724" />
      {props.children}
    </SafeAreaView>
  );
}

export function ContentContainer(props) {
  return (
    <View style={[styles.appContainer, props.style]}>{props.children}</View>
  );
}

export function CloseForBar(props) {
  return (
    <View style={styles.closeForBar}>
      {/* <Icon
        size={36}
        name='times'
        color={AppConstants.ICON_BUTTON_COLOR}
        onPress={props.close}
        type='light'
      /> */}
    </View>
  );
}

const NDAU = require('img/ndau_orange_logo.png');

export function LoginImage(props) {
  return (
    <View style={styles.loginImageView}>
      <Image style={styles.loginImage} resizeMode="contain" source={NDAU} />
    </View>
  );
}

export function TitleBarGradient(props) {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.02}}
      end={{x: 0.0, y: 1.0}}
      locations={[0, 0.05]}
      colors={[
        AppConstants.TITLE_BAR_GRADIENT_START_COLOR,
        AppConstants.TITLE_BAR_GRADIENT_END_COLOR,
      ]}
      style={[styles.appContainerOverlay]}>
      {props.children}
    </LinearGradient>
  );
}

export function AccountDetailsTitleBarGradient(props) {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.0, y: 0.7}}
      locations={[0, 0.2, 0.6]}
      colors={[
        AppConstants.TITLE_BAR_GRADIENT_START_COLOR,
        AppConstants.TITLE_BAR_GRADIENT_END_COLOR,
        AppConstants.TITLE_BAR_GRADIENT_START_COLOR,
      ]}
      style={[styles.appContainerOverlay]}>
      {props.children}
    </LinearGradient>
  );
}

export function ParagraphText(props) {
  return (
    <Text
      style={[
        props.noPaddingOrMargin
          ? styles.paragraphTextNoPaddingOrMargin
          : styles.paragraphText,
        props.textStyle,
      ]}
      {...props}>
      {props.children}
    </Text>
  );
}

export function BooleanSetting(props) {
  return (
    <View style={styles.booleanSettingPanel}>
      <View>
        <ParagraphText>{props.title}</ParagraphText>
      </View>
      <View>
        <Switch trackColor={AppConstants.SQUARE_BUTTON_COLOR} {...props} />
      </View>
    </View>
  );
}

export function NdauQRCodeScanner(props) {
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  // const isAppForeground = useIsAppForeground()
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanned, setIsScanned] = React.useState(false);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      switch (status) {
        case 'authorized':
          setHasPermission(true);
          break;
        case 'not-determined':
          const status = await Camera.requestCameraPermission();
          setHasPermission(status == 'authorized');
        default:
      }
    })();
  }, []);

  React.useEffect(() => {
    if (barcodes && barcodes.length > 0 && isScanned === false) {
      setIsScanned(true);
      props.onBarCodeRead(barcodes[0].content);
    }
  }, [barcodes]);

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: '#000',
      }}>
      {(!device || !hasPermission) && (
        <View
          style={{
            backgroundColor: 'black',
            position: 'absolute',
            height: hp('45%'),
            width: hp('45%'),
            alignItems: 'center',
          }}>
          <Text>Camera is not ready</Text>
        </View>
      )}
      {!isScanned && device && hasPermission ? (
        <View>
          <Camera
            ref={cameraRef}
            style={{
              position: 'absolute',
              opacity: 1,
              height: hp('45%'),
              width: hp('45%'),
              alignItems: 'center',
            }}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
            audio={false}
            //isActive={isAppForeground}
          />
          <Image
            style={{
              height: hp('45%'),
              width: hp('45%'),
              // top:100,
              resizeMode: 'contain',
            }}
            source={require('../../../img/border.png')}
          />
        </View>
      ) : (
        isScanned && (
          <View>
            <NdauQRCode value={barcodes.rawValue} />
            <TouchableOpacity
              onPress={() => setIsScanned(false)}
              style={{
                backgroundColor: '#4C9578',
                width: wp('100%'),
                padding: '2%',
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#D8FFE4'}}>Rescan</Text>
            </TouchableOpacity>
          </View>
        )
      )}
    </View>
  );
}

export function NdauQRCode(props) {
  return (
    <View style={styles.qrCode}>
      <QRCode value={props.value} size={hp('30%')} />
    </View>
  );
}

export function LoadingSpinner(props) {
  return (
    <Spinner
      visible={props.spinner}
      textContent={props.text ? props.text : 'Loading...'}
      textStyle={{
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Light',
      }}
      animation="fade"
      overlayColor="rgba(0, 0, 0, 0.7)"
    />
  );
}

export function RefreshScrollView(props) {
  return (
    <ScrollView
      style={{flex: 1}}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
          tintColor="white"
        />
      }>
      {props.children}
    </ScrollView>
  );
}
