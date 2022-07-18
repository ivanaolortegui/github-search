import axios from 'axios'
import { helpHttp } from './helpHttp';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const url = 'https://api.github.com/search/repositories?q=shoppingcart';
const responseWithError = {
  "err": true,
  "status": '00',
  "statusText": "Ocurrió un error",
};
const responseOk = [{ "id": 1, "name": "Joe Doe" }, { "id": 2, "name": "Jane Doe" }]
const headers = {
  accept: "application/json",
};

describe('HelpHttp', () => {
  test('Responding with Error', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Joe Doe'
        },
        {
          id: 2,
          name: 'Jane Doe'
        }
      ],
    });
    helpHttp().get(url, headers).then((response) => {
      expect(response).toEqual(responseWithError);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    })
  })


  test('Responding with status 200', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Joe Doe'
        },
        {
          id: 2,
          name: 'Jane Doe'
        }
      ],
      status: 200,
    });
    helpHttp().get(url, headers).then((response) => {
      expect(response).toEqual(responseOk);
    })
  })
});

