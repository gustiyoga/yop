import firebase from '../../../service/firebase'

let boardsRef = firebase.database.ref('boards')
const syncBoards = (context) => {
    context.commit('TOGGLE_LOADING', true)
    boardsRef.on('value', function (snapshot) {
        context.commit('SET_BOARDS_DATA', snapshot.val())
        context.commit('TOGGLE_LOADING', false)
    }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code)
    })
}

const stopSyncBoards = (context) => {
    boardsRef.off()
}

const addBoard = (context, payload) => {
    boardsRef.push({
        name: payload.title
    })
}

const clearBoards = (context) => {
    context.commit('SET_BOARDS_DATA', null)
}

export default {
    syncBoards,
    stopSyncBoards,
    addBoard,
    clearBoards
}
