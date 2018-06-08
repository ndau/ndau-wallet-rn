import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import Types from './NavigationTypes';
import Dashboard from './Dashboard';
import Actions from './Actions';
import Transitions from './Transitions';

import Push from './types/Push';
import Drawer from './types/Drawer';
import ListScreen from './types/ListScreen';
import DummyScreen from './types/DummyScreen';
import LightBox from './types/LightBox';
import Notification from './types/Notification';
import Modal from './types/Modal';
import CustomTopBarScreen from './types/CustomTopBarScreen';
import CustomButtonScreen from './types/CustomButtonScreen';
import TopTabs from './types/TopTabs';
import TabOne from './types/tabs/TabOne';
import TabTwo from './types/tabs/TabTwo';

import CollapsingHeader from './transitions/CollapsingHeader';
import SharedElementTransitions from './transitions/SharedElementTransitions';

import Cards from './transitions/sharedElementTransitions/Cards/Cards';
import CardsInfo from './transitions/sharedElementTransitions/Cards/Info';

import Masonry from './transitions/sharedElementTransitions/Masonry/Masonry';
import MasonryItem from './transitions/sharedElementTransitions/Masonry/Item';

export function registerScreens() {
  Navigation.registerComponent('ndau.Dashboard', () => Dashboard);
  Navigation.registerComponent('ndau.Types', () => Types);
  Navigation.registerComponent('example.Actions', () => Actions);
  Navigation.registerComponent('example.Transitions', () => Transitions);

  Navigation.registerComponent('ndau.Types.Push', () => Push);
  Navigation.registerComponent('ndau.Types.Drawer', () => Drawer);
  Navigation.registerComponent('ndau.Types.Screen', () => Drawer);
  Navigation.registerComponent('ndau.Types.ListScreen', () => ListScreen);
  Navigation.registerComponent('ndau.Types.DummyScreen', () => DummyScreen);
  Navigation.registerComponent('ndau.Types.Modal', () => Modal);
  Navigation.registerComponent('ndau.Types.LightBox', () => LightBox);
  Navigation.registerComponent('ndau.Types.Notification', () => Notification);
  Navigation.registerComponent('ndau.Types.CustomTopBarScreen', () => CustomTopBarScreen);
  Navigation.registerComponent('ndau.Types.CustomButtonScreen', () => CustomButtonScreen);
  Navigation.registerComponent('ndau.Types.TopTabs', () => TopTabs);
  Navigation.registerComponent('ndau.Types.TopTabs.TabOne', () => TabOne);
  Navigation.registerComponent('ndau.Types.TopTabs.TabTwo', () => TabTwo);

  Navigation.registerComponent('example.Transitions.CollapsingHeader', () => CollapsingHeader);
  Navigation.registerComponent(
    'example.Transitions.SharedElementTransitions',
    () => SharedElementTransitions
  );
  Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards', () => Cards);
  Navigation.registerComponent(
    'example.Transitions.SharedElementTransitions.Cards.Info',
    () => CardsInfo
  );
  Navigation.registerComponent(
    'example.Transitions.SharedElementTransitions.Masonry',
    () => Masonry
  );
  Navigation.registerComponent(
    'example.Transitions.SharedElementTransitions.Masonry.Item',
    () => MasonryItem
  );
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({ screen }) => console.log(`Displaying screen ${screen}`),
    didAppear: ({ screen, startTime, endTime, commandType }) =>
      console.log(
        'screenVisibility',
        `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`
      ),
    willDisappear: ({ screen }) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({ screen }) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
