import {conect} from './config';

export const login = async(email, password) => {
    await conect.post(`/user/login`, {email, password})
}

export const storage = async() => {
    const res = await conect.get(`/storage`)
    return res.data.files
}

export const downloadFile = async(id) => {
    try{
        window.open(`http://localhost:5000/api/storage/download/${id}`, '_blank');
    }catch(e){
        console.log(e)
    }
}

export const auth = async() => {
    const res = await conect.get('/user/auth')
    return res.data.decode
}

export const logout = async() => {
    await conect.post('/user/logout')
}

export const dellFile = async(id) => {
    const res = await conect.delete(`/admin/fileDell/${id}`)
    return res.data.files
}

export const uploadFile = async(file) => {
    const res = await conect.post('/admin/fileUpload', file, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    })
    return res.data.files

}

export const user = async() => {
    const res = await conect.get('/admin')
    return res.data.users
}

export const registerUser = async(newUser) => {
    const res = await conect.post('/admin/registerUser', newUser)
    return res.data.users
}

export const dellUser = async(id) => {
    const res = await conect.delete(`/admin/dellUser/${id}`)
    return res.data.users
}

