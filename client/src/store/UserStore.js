import { makeAutoObservable } from 'mobx'

class userStoree {
    _isAuth = false
    _user = {}

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}

const UserStore = new userStoree() // надо для начала создать экзепляр (так типо больше контроля (хз))
export default UserStore