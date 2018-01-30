import Vue from 'vue'
import firebase from './../service/firebase'
import Vuex from 'vuex'
import Vuefire from 'vuefire'

Vue.use(Vuex, Vuefire)

let boardsRef = firebase.database.ref('boards')
export const store = new Vuex.Store({
    state: {
        boardsData: null,
        // isLoggedIn: null,
        loadedBoards: [
            {
                'id': 0,
                // 'url': 'https://picsum.photos/600/600?image=1067',
                'color': 'blue',
                'comment': 'Aplikasi Kasir Berbasis Web',
                'info': 'Posted by Kevin on Friday'
            },
            {
                'id': 1,
                'url': 'https://picsum.photos/600/600?image=1061',
                'comment': 'Aplikasi Tutorial Membuat Tutorial',
                'info': 'Posted by Charles on Tuesday'
            },
            {
                'id': 2,
                'url': 'https://picsum.photos/600/600?image=1051',
                'comment': 'Aplikasi Murah Meriah Males Ngerjain',
                'info': 'Posted by Richard on Monday'
            },
            {
                'id': 3,
                'url': 'https://picsum.photos/600/600?image=1049',
                'comment': 'Aplikasi Client Gak Tau Mau Buat Apa',
                'info': 'Posted by Richard on Monday'
            },
            {
                'id': 4,
                'url': 'https://picsum.photos/600/600?image=1037',
                'comment': 'Aplikasi Kebanyakan Revisi',
                'info': 'Posted by Richard on Monday'
            }
        ]
    },
    mutations: {
        // TOGGLE_ISLOGGEDIN: (state, payload) => {
        //     state.isLoggedIn = payload
        // }
        SET_BOARDS_DATA: (state, payload) => {
            state.boardsData = payload
        }
    },
    actions: {
        // toggleIsLoggedIn: (context, payload) => {
        //     context.commit('TOGGLE_ISLOGGEDIN', payload)
        // }
        syncBoards: (context) => {
            boardsRef.on('value', function (snapshot) {
                context.commit('SET_BOARDS_DATA', snapshot.val())
            }, function (errorObject) {
                console.log('The read failed: ' + errorObject.code)
            })
        },
        stopSyncBoards: (context) => {
            boardsRef.off()
        },
        addBoard: (context, payload) => {
            boardsRef.push({
                name: payload.title
            })
        }
    },
    getters: {
        // isLoggedIn: state => state.isLoggedIn,
        loadedBoards (state) {
            return state.loadedBoards.sort((boardA, boardB) => {
                return boardA.id > boardB.id
            })
        },
        loadedBoard (state) {
            return (boardId) => {
                return state.loadedBoards.find((board) => {
                    return board.id === boardId
                })
            }
        },
        getBoards: state => {
            // boardsRef.on('value', function (snapshot) {
            //     state.boardsData = snapshot.val()
            //     console.log('loaded')
            // }, function (errorObject) {
            //     console.log('The read failed: ' + errorObject.code)
            // })
            return state.boardsData
        }
    }
})
