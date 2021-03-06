import http from '@/netClient/config';

export async function doRegister(login, password) {

    try {
        const response = await http.post('/sa/api/auth/registration', {
            login,
            password,
        })
        return response.data;
    } catch (error) {
        console.error({
            error
        })
        throw error;
    }

}

export async function doLogin(login, password) {

    try {
        const response = await http.post('/api/auth/login', {
            login,
            password,
        })
        const accessToken = response.data.accessToken;
        const role = response.data.role;
        localStorage.accessToken = accessToken;
        localStorage.role = role;
        return accessToken;
    } catch (error) {
        console.error({
            error
        })
        throw error;
    }
}

export async function doLogout() {

    try {
        const response = await http.post('/api/auth/logout',{}, 
        {
            headers: {
                'Contentt-Type': 'application/json',
                'x-access-token': localStorage.accessToken
            }
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        return response.data;
    } catch (error) {
        console.error({
            error
        })
        throw error;
    }
}


// export async function fetchTodoList(){
//     try{
//         const response = await http.get('/todos',{
//             headers:{
//                 'Content-Type': 'application/json',
//                 'x-access-token': localStorage.accessToken
//             }
//         })

//         return response.data?.todos || [];
//     }catch(error){
//         console.error({error})
//         throw error;
//     }
// }