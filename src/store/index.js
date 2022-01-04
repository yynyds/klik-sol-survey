import Vuex from 'vuex'
import Vue from 'vue'
import groupsQuestionData from './modules/groupsQuestion'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        groupsQuestionData
    }
})

export default store