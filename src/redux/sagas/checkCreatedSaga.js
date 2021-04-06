import { call, put, takeLatest } from "redux-saga/effects";
import { getCheckCreated, setCheckCreated } from "../checkCreated";
import axios from "axios";

function* watcherCheckCreated() {
  yield takeLatest(getCheckCreated.type, workerCheckCreated);
}

function* workerCheckCreated() {
  try {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    if (!token) return;
    let result = yield call(fetchCheckCreated);
    result = result.data;
    yield put(setCheckCreated(result));
  } catch (err) {
    console.log(err);
  }
}

function fetchCheckCreated() {
  let URL = process.env.REACT_APP_apiUrl + "/checkCreated";
  let token = JSON.parse(localStorage.getItem("userData")).token;
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return axios.get(URL, options);
}

export default watcherCheckCreated;
