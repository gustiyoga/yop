import Vue from 'vue'
import firebase from './../service/firebase'
import Vuex from 'vuex'
import Vuefire from 'vuefire'

Vue.use(Vuex, Vuefire)

let boardsRef = firebase.database.ref('boards')
export const store = new Vuex.Store({
    state: {
        boardsData: [],
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
        ],
        users: {
            id: '1',
            registeredBoards: ['12']
        }
    },
    mutations: {},
    actions: {},
    getters: {
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
        getBoards (state) {
            boardsRef.on('value', function (snapshot) {
                // state.boardsData.data = snapshot.val()
                state.boardsData = snapshot.val()
            }, function (errorObject) {
                console.log('The read failed: ' + errorObject.code)
            })
            return state.boardsData
        }
    }
})
