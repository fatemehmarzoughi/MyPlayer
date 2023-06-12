jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native-push-notification', () => {
  return {
    configure: jest.fn(),
    createChannel: jest.fn(),
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(() => Promise.resolve()),
    getInitialNotification: jest.fn(() => Promise.resolve()),
    getScheduledLocalNotifications: jest.fn(() => Promise.resolve()),
  };
});
jest.mock('react-native-status-bar-height', () => {
  return {
    getStatusBarHeight: jest.fn(() => 10),
  };
});
jest.mock('react-native-vector-icons/Ionicons', () => {});
jest.mock('react-native-vector-icons/EvilIcons', () => {});

export default {
  POST: ({endpoint, reqBody}) => {},
};
