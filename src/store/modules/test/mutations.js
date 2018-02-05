const TOGGLE_LOADING = (state, payload) => {
    state.isLoading = payload
}

const SET_BOARDS_DATA = (state, payload) => {
    state.boardsData = payload
}

export default {
    TOGGLE_LOADING,
    SET_BOARDS_DATA
}
