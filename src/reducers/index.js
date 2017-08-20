import { combineReducers } from 'redux'
import client from '../store/apollo'
import common from './common'

const reducers = combineReducers({
    apollo: client.reducer(),
    common
})

export default reducers