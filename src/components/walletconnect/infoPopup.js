import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import SessionBloc from '../blocs/SessionBloc';
import {useSnapshot} from 'valtio';

const InfoSnackBar = () => {

  const {infoPopup,infomessage} = useSnapshot(SessionBloc.state);
  const [visible, setVisible] = React.useState(true);

  const onDismissSnackBar = () =>  SessionBloc.setInfoPopup('',false);

  return (
      <Snackbar
        visible={infoPopup}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            SessionBloc.setInfoPopup('',false)
            // Do something
          },
        }}>
       {infomessage}
      </Snackbar>
  );
};

const styles = StyleSheet.create({
  container: {
position:'absolute',
    justifyContent: 'space-between',
  },
});

export default InfoSnackBar;