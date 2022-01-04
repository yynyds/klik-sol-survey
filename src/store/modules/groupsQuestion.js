import {
    LOAD_GROUPSDATA_FAILURE,
    LOAD_GROUPSDATA_REQUEST,
    LOAD_GROUPSDATA_SUCCESS,
    UPDATE_GROUPSDATA_FAILURE,
    UPDATE_GROUPSDATA_REQUEST,
    // UPDATE_GROUPSDATA_SUCCESS
} from '../mutations'
import { Notification } from 'element-ui'
import { payloadData } from '../../mocData/index'
import getGroupsQuestion from '../../resources/groupsQuestion'
// import { updateGroupsQuestion } from '../../resources/groupsQuestion'

export default {
    state: {
        data: [],
    },
    actions: {
        loadGroupsQuestionData({ commit }) {
            commit(LOAD_GROUPSDATA_REQUEST)
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
        },
        updateHealthData({ commit }, data) {
            commit(UPDATE_GROUPSDATA_REQUEST, data)
            /* return updateGroupsQuestion({groupId: data.groupId, question}).then(response => {
                commit(UPDATE_GROUPSDATA_SUCCESS, response)
                return true
            }).catch(error => {
                commit(UPDATE_GROUPSDATA_FAILURE, error)
                return false
            }) */
        }
    },
    mutations: {
        [LOAD_GROUPSDATA_REQUEST] (state) {
            state.error = null
        },
        [LOAD_GROUPSDATA_SUCCESS] (state, data) {
            state.data = data
        },
        [LOAD_GROUPSDATA_FAILURE] (state, error) {
            state.data = []
            if (error) {
                if (error.response) {
                    if (error.response.status === 500) {
                        state.error = error.response.data.message
                        Notification.error({
                            title: 'Error',
                            offset: 60,
                            message: error.response.data.message
                        })
                    }
                }
            }
        },
        [UPDATE_GROUPSDATA_REQUEST] (state, data) {
            // some code
            state.data.find(item => +item.groupId === +data.groupId).questions.find(ques => {
                if (+ques.id === +data.id) {
                    return Object.assign(ques, { health: data.health })
                }
                return ques
            })
        },
        // [UPDATE_GROUPSDATA_SUCCESS] (state, { data }) {
        //     // some code
        // },
        [UPDATE_GROUPSDATA_FAILURE] (state, error) {
            if (error) {
                if (error.response) {
                    if (error.response.status === 500) {
                        state.error = error.response.data.message
                        Notification.error({
                            title: 'Error',
                            offset: 60,
                            message: error.response.data.message
                        })
                    }
                }
            }
        },
    },
    getters: {
        groupsQuestionData: state => { return state.data }
    }
}
