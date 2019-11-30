const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const model = {
  namespace: 'app',
  state: {
    count: 0,
  },
  reducers: {
    caculate(state, { payload }) {
      return {
        ...state,
        count: payload 
      };
    },
  },
  effects: {
    *init(_, { put }) {
      yield delay(2000);
      yield put({ type: 'caculate', payload: -1 });
    }
  },
};

export default model;