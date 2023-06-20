import React from 'react';
import {ModalClass} from '../../../src/components/Modals/QuestionBoxModal';
import {render, cleanup, screen, waitFor} from '@testing-library/react-native';

import '@testing-library/jest-dom';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-status-bar-height', () => ({
  getStatusBarHeight: jest.fn(() => 10),
}));

describe('Question Box Modal tests', () => {
  afterEach(done => {
    done();
    cleanup();
  });

  it('should popup the modal', async () => {
    const fn = jest.fn();

    const component = (
      <ModalClass
        btnTitle="title"
        question="question"
        modalVisible={true}
        handleCancelBtn={fn}
        handleMainBtn={fn}
      />
    );

    render(component);

    const container = screen.getByTestId('container');
    await waitFor(() => expect(container).toBeTruthy());
  });

  // it('should remove the modal after click on cancel button', async () => {
  //   const fn = jest.fn();

  //   const component = (
  //     <ModalClass
  //       btnTitle="title"
  //       question="question"
  //       modalVisible={true}
  //       handleCancelBtn={fn}
  //       handleMainBtn={fn}
  //     />
  //   );

  //   render(component);

  //   const container = screen.getByTestId('container');
  //   const cancelBtn = screen.getByTestId(
  //     'cancelBtn',
  //   ) as unknown as TouchableOpacity;

  //   cancelBtn.props.onPress?.();

  //   await waitFor(() => expect(container.children).not.toBeTruthy());
  // });
});
