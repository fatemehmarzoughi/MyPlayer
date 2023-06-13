import React from 'react';
import {render, cleanup, screen} from '@testing-library/react-native';

import '@testing-library/jest-dom';
import {ModalClass} from '../../../src/components/Modals/QuestionBoxModal';
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-status-bar-height', () => ({
  getStatusBarHeight: jest.fn(() => 10),
}));

describe('Question Box Modal tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('should popup the modal', () => {
    const fn = jest.fn();

    render(
      <ModalClass
        btnTitle="title"
        question="question"
        modalVisible={true}
        handleCancelBtn={fn}
        handleMainBtn={fn}
      />,
    );

    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();
  });
});
