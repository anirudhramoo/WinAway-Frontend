import { call, put, takeLatest } from "redux-saga/effects";
import { getGiveaway, setGiveaway } from "../giveaways";
import axios from "axios";

function* watcherGiveaway() {
  yield takeLatest(getGiveaway.type, workerGiveaway);
}

function* workerGiveaway() {
  try {
    let giveaways = yield call(fetchGiveaways);
    giveaways = giveaways.data;
    yield put(setGiveaway(giveaways));
  } catch (err) {
    console.log(err.response);
  }
}

function fetchGiveaways() {
  let URL = process.env.REACT_APP_apiUrl + "/giveaways";
  return axios.get(URL);
}

export default watcherGiveaway;
