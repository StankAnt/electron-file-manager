import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { ApplicationState, rootReducer, rootSaga } from './store';

const configureStore = (): Store<ApplicationState> => {
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        {},
    );

    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;
