import React from 'react'
import { StyleSheet } from 'react-native'
import SetupConfirmRecoveryPhrase from '../SetupConfirmRecoveryPhrase'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import SetupStore from '../../model/SetupStore'

function makeStyles () {
  return StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  })
}

function makeNavigator () {
  return {
    navigate: () => {}
  }
}

function makeWords () {
  return 'zero one two three four four six seven eight nine ten eleven'.split(
    ' '
  )
}

describe('SetupConfirmRecoveryPhrase presentation', () => {
  beforeEach(() => {
    SetupStore.recoveryPhrase = makeWords()
    SetupStore.entropy = 'dGVzdGluZ3dlc3Rpbmdh'
    SetupStore.shuffledMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    SetupStore.shuffledWords = makeWords()
    this.tree = renderer
      .create(
        <SetupConfirmRecoveryPhrase
          navigation={makeNavigator()}
          parentStyles={makeStyles()}
        />
      )
      .toJSON()
  })
})

describe('SetupConfirmRecoveryPhrase behavior', () => {
  beforeEach(() => {
    // set up default wrapper for every test.
    SetupStore.recoveryPhrase = makeWords()
    SetupStore.entropy = 'dGVzdGluZ3dlc3Rpbmdh'
    SetupStore.shuffledMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    SetupStore.shuffledWords = makeWords()
    this.wrapper = mount(
      <SetupConfirmRecoveryPhrase navigation={makeNavigator()} />
    )
    this.press = index => {
      this.wrapper.find('Word').at(index).props().onPress()
    }
  })

  test('done button starts disabled', () => {
    const doneButton = this.wrapper.find('Button').at(1)
    expect(doneButton.prop('disabled')).toBeTruthy()
  })

  test('trigger error state with incorrect sequence', () => {
    this.press(0)
    this.press(1)
    this.press(2)
    this.press(4) // wrong
    this.wrapper.update()
    expect(this.wrapper.state().inError).toBeTruthy()
  })

  test('error count goes up with incorrect input', () => {
    this.press(4) // wrong
    this.wrapper.update()
    expect(this.wrapper.state().errorWord).toBe(4)
    expect(this.wrapper.state().errorCount).toBe(1)
  })

  test('done button is enabled after correct sequence', () => {
    makeWords().forEach((e, i) => {
      this.wrapper.find('Word').at(i).props().onPress()
    })
    this.wrapper.update()
    const doneButton = this.wrapper.find('Button').at(1)
    expect(doneButton.prop('disabled')).toBeFalsy()
  })

  test('trigger error state with incorrect word', () => {
    this.press(6) // wrong
    this.wrapper.update()
    expect(this.wrapper.state().inError).toBeTruthy()
    expect(this.wrapper.state().errorWord).toBe(6)
    expect(this.wrapper.state().errorCount).toBe(1)
  })

  test('correct error state by deselecting word', () => {
    this.press(6) // wrong
    this.press(6) // correction
    this.wrapper.update()
    expect(this.wrapper.state().inError).toBeFalsy()
    expect(this.wrapper.state().errorCount).toBe(1)
  })

  it('should not be able to click any buttons after a mistake', () => {
    this.press(6) // wrong
    this.press(1) // another wrong
    this.wrapper.update()
    expect(this.wrapper.state().selected).toEqual([6])
    expect(this.wrapper.state().errorCount).toBe(1)
  })

  test('trigger error state with incorrect sequence', () => {
    this.press(0)
    this.press(1)
    this.press(2)
    this.press(4) // wrong
    this.wrapper.update()
    expect(this.wrapper.state().inError).toBeTruthy()
    expect(this.wrapper.state().errorWord).toBe(4)
    expect(this.wrapper.state().errorCount).toBe(1)
  })

  test('lockem out after too many mistakes', () => {
    this.press(1) // wrong
    expect(this.wrapper.state().errorCount).toBe(1)
    this.press(1) // correction

    this.press(2) // wrong
    expect(this.wrapper.state().errorCount).toBe(2)
    this.press(2) // correction

    this.press(0) // correct

    this.press(4) // wrong
    expect(this.wrapper.state().errorCount).toBe(3)
    this.press(4) // correction

    this.press(4) // wrong again

    expect(this.wrapper.state().errorCount).toBe(4)
    this.wrapper.update()
    expect(this.wrapper.state().mustRetry).toBeTruthy()
  })

  test('allow incorrect sequence of duplicate words', () => {
    this.press(0)
    this.press(1)
    this.press(2)
    this.press(3)
    this.press(5) // "four"
    this.press(4) // "four"
    this.wrapper.update()
    expect(this.wrapper.state().inError).toBeFalsy()
  })
})
