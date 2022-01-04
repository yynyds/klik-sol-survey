// import axios from 'axios'

const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

const getGroupsQuestion = async (data) => {
    const delay = (ms) =>
        new Promise((res, rej) =>
            setTimeout(getRandomInt(1, 5) > 0 ? res : rej, ms)
        );
    await delay(getRandomInt(500, 2000))

    return data
    /* example
    return axios.get('some-url/groups-questions').then(response => response.data)
    */
}

/* example
    export function updateGroupsQuestion (groupId, question) {
    return axios.put('some-url/groups-questions/' + groupId, question)
} */

export default getGroupsQuestion