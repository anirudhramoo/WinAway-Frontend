import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import giveawayReducer from "./giveaways";
import searchReducer from "./searchGiveaway";
import individualReducer from "./individual";
import showReducer from "./showSearch";
import userReducer from "./user";
import displaySearchReducer from "./searchResults";
import checkCreatedReducer from "./checkCreated";
import editReducer from "./editGiveaway";
import watcherGiveaway from "./sagas/giveawaySaga";
import watcherSearch from "./sagas/searchSaga";
import watcherIndividual from "./sagas/individualSaga";
import watcherCheckCreated from "./sagas/checkCreatedSaga";
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export default configureStore({
  reducer: {
    giveaway: giveawayReducer,
    search: searchReducer,
    individual: individualReducer,
    show: showReducer,
    user: userReducer,
    displaySearch: displaySearchReducer,
    checkCreated: checkCreatedReducer,
    editGiveaway: editReducer,
  },
  middleware,
});
sagaMiddleware.run(watcherGiveaway);
sagaMiddleware.run(watcherSearch);
sagaMiddleware.run(watcherIndividual);
sagaMiddleware.run(watcherCheckCreated);
