import api from '../../services/facade';

// sample how to call api's
const TempService = {
  testApi: () => {
    return api.get<any>(`/api/users/random_user`).then((res) => res);
  },
};

export default TempService;
