import { call, put, takeLatest, cancelled } from "redux-saga/effects";
import { getSearch, setSearch } from "../searchGiveaway";
import axios from "axios";

function* watcherSearch() {
  yield takeLatest(getSearch.type, workerSearch);
}
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

function* workerSearch(action) {
  const cancelSource = axios.CancelToken.source();
  try {
    const { payload } = action;
    let URL = process.env.REACT_APP_apiUrl + `/giveaways?search=${payload}`;
    let giveaways = yield call(
      axios.get,
      URL,
      { cancelToken: cancelSource.token },
      payload
    );
    giveaways = giveaways.data;

    yield put(setSearch(giveaways));
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

export default watcherSearch;
