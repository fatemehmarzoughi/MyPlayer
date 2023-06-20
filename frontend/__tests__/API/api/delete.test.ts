import {DELETE} from '../../../src/API/API';

// jest.mock('../../../src/LocalStorage/AsyncStorageData.ts', () => ({
//   getData: jest.fn().mockReturnValueOnce(342),
// }));

// jest.mock('axios', () => {
//   const axios = jest.requireActual('axios');
//   axios.defaults.baseURL = 'baseURL';
//   axios.defaults.headers.post['Content-Type'] = 'application/json';
//   axios.defaults.headers.post['Accept'] = 'application/json';

//   axios.__esModule = true;

//   axios.default = jest
//     .fn()
//     .mockReturnValueOnce(Promise.resolve('expectedData'));

//   return axios;
// });

describe('Testing delete method', () => {
  it('should return the appropriate data when the request resolve', async () => {
    // const res = await DELETE({endpoint: 'endpoint'});

    // expect(res).toEqual('expectedData');
  });
});
