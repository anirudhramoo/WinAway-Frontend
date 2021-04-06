import { call, put, takeLatest } from "redux-saga/effects";
import { getIndividual, setIndividual } from "../individual";
import axios from "axios";

function* watcherIndividual() {
  yield takeLatest(getIndividual.type, workerIndividual);
}

function* workerIndividual(action) {
  try {
    const { payload } = action;
    let individual = yield call(fetchIndividuals, payload);
    individual = individual.data;
    yield put(setIndividual(individual));
  } catch (err) {
    console.log(err.response);
    yield put(setIndividual("not-found"));
  }
}

function fetchIndividuals(data) {
  let URL = process.env.REACT_APP_apiUrl + `/giveaways/${data}`;
  return axios.get(URL);
}

export default watcherIndividual;
