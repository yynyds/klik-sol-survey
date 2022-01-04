import {
    LOAD_GROUPSDATA_FAILURE,
    LOAD_GROUPSDATA_SUCCESS
} from '../mutations'
import { payloadData } from '../../mocData/index'
import getGroupsQuestion from '../../resources/groupsQuestion'

export default {
    state: {
        data: [],
    },
    actions: {
        loadGroupsQuestionData({ commit }) {
            return getGroupsQuestion(payloadData).then(response => {
                return response
            })
                .then(data => {
                    commit(LOAD_GROUPSDATA_SUCCESS, data)
                    return true
                })
                .catch(error => {
                    commit(LOAD_GROUPSDATA_FAILURE, error)
                    return false
                })
        }
    },
    mutations: {
        [LOAD_GROUPSDATA_SUCCESS] (state, data) {
            state.data = data
        },
        [LOAD_GROUPSDATA_FAILURE] (state, error) {
            state.data = []
            if (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        state.error = error.response.data.message
                        Notification.error({
                            title: 'Error',
                            offset: 60,
                            message: error.response.data.message
                        })
                    }
                }
            }
        }
    },
    getters: {
        groupsQuestionData: state => { return state.data }
    }
}
