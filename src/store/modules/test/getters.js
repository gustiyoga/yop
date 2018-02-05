const isLoading = (state) => {
    return state.isLoading
}

const getBoards = (state) => {
    return state.boardsData
}

const loadedBoards = (state) => {
    return state.loadedBoards.sort((boardA, boardB) => {
        return boardA.id > boardB.id
    })
}

const loadedBoard = (state) => {
    return (boardId) => {
        return state.loadedBoards.find((board) => {
            return board.id === boardId
        })
    }
}

export default {
    isLoading,
    getBoards,
    loadedBoards,
    loadedBoard
}
