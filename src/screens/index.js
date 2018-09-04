import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

import SetupMain from './SetupMain';
import Dashboard from './Dashboard';
import SetupUserId from './SetupUserId';
import SetupEncryptionPassword from './SetupEncryptionPassword';
import SetupGetRandom from './SetupGetRandom';
import SetupYourWallet from './SetupYourWallet';
import SetupQRCode from './SetupQRCode';
import SetupSeedPhrase from './SetupSeedPhrase';
import SetupConfirmSeedPhrase from './SetupConfirmSeedPhrase';
import SetupTermsOfService from './SetupTermsOfService';
import SetupEAINode from './SetupEAINode';
import Passphrase from './Passphrase';
import Settings from './Settings';

//TODO: This is temporary until react-native-material-dropdown fixes their code
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([ 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader' ]);

export function registerScreens(store, Provider) {
  Navigation.registerComponent('ndau.Dashboard', () => {
    return class DashboardScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <Dashboard {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.Settings', () => {
    return class SettingsScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <Settings {...this.props} />
          </Provider>
        );
      }
    };
  });

  Navigation.registerComponent('ndau.Passphrase', () => {
    return class PassphraseScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <Passphrase {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.SetupMain', () => {
    return class SetupMainScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <SetupMain {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.SetupUserId', () => {
    return class SetupUserIdScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <SetupUserId {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.SetupEncryptionPassword', () => {
    return class SetupEncryptionPasswordScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <SetupEncryptionPassword {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.SetupGetRandom', () => {
    return class SetupGetRandomScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <SetupGetRandom {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.SetupYourWallet', () => {
    return class SetupYourWalletScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <SetupYourWallet {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.SetupSeedPhrase', () => {
    return class SetupSeedPhraseScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <SetupSeedPhrase {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.SetupConfirmSeedPhrase', () => {
    return class SetupConfirmSeedPhraseScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <SetupConfirmSeedPhrase {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.SetupQRCode', () => {
    return class SetupQRCodeScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <SetupQRCode {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.SetupTermsOfService', () => {
    return class SetupTermsOfServiceScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <SetupTermsOfService {...this.props} />
          </Provider>
        );
      }
    };
  });
  Navigation.registerComponent('ndau.SetupEAINode', () => {
    return class SetupEAINodeScreen extends Component {
      render() {
        return (
          <Provider store={store}>
            <SetupEAINode {...this.props} />
          </Provider>
        );
      }
    };
  });
}
