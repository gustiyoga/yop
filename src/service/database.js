import database from './firebase'

export default {
    // API
    auth: database.auth.currentUser
}
