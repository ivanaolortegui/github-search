import axios from 'axios'
import { helpHttp } from './helpHttp';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const url = 'https://api.github.com/search/repositories?q=shoppingcart';
const responseWithError = {
  "err": true,
  "status": 400,
  "statusText": "Ocurrió un error",
};
const responseOk = {
  items: [{
    owner: { avatar_url: "https://avatars.githubusercontent.com/u/1297781?v=4", },
    id: 1,
    name: 'Joe Doe'
  }]
}



const headers = {
  accept: "application/json",
};

describe('HelpHttp', () => {
  test('Responding with Error', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        items: [{
          owner: { avatar_url: "https://avatars.githubusercontent.com/u/1297781?v=4", },
          id: 1,
          name: 'Joe Doe'
        }]
      }, status: 400,
      "statusText": "Ocurrió un error",
    });
    helpHttp().get(url, headers).then((response) => {
      expect(response).toEqual(responseWithError);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    })
  })


  test('Responding with status 200', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        items: [{
          owner: { avatar_url: "https://avatars.githubusercontent.com/u/1297781?v=4", },
          id: 1,
          name: 'Joe Doe'
        }]
      },
      status: 200,

    });
    helpHttp().get(url, headers).then((response) => {
      expect(response).toEqual(responseOk);
    })
  })
});

