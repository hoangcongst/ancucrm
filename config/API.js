import { API_HOST, API_HOST_V2 } from './config'
import base64 from 'base-64'
let myHeaders = new Headers();
const authen_user = 'vtiger_crm'
const authen_pass = 'vtiger_crm#@!'
myHeaders.append('Authorization', 'Basic ' + base64.encode(authen_user + ":" + authen_pass))
let myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

export function fetchPotentials(sessionName, offset=0) {
    return fetch(API_HOST + 'potentials?limit=20&order_way=desc' + 
        '&order_by=potential_no&sessionName=' + sessionName + '&offset=' + offset, myInit)
        .then(response => response.json())
}

export function logIn(user, pass, callback) {
    return fetch(API_HOST_V2 + 'login?username=' + user + '&password=' + pass, myInit)
        .then(response => response.json()).then((response) => callback(response))
}

export function register(action) {
    return fetch(API_HOST + '/api/user/register', {
        method: 'post',
        body: action.formData,
        mode: 'cors'
    })
        .then(response => response.json())
}

export function getOwnerUser(api_token) {
    return fetch(API_HOST + '/api/user?api_token=' + api_token, myInit)
        .then(response => response.json())
}

export function refreshToken(api_token) {
    return fetch(API_HOST + '/api/refresh-token?api_token=' + api_token, myInit)
        .then(response => response.json())
}

export function getConfirmProvider(api_token) {
    return fetch(API_HOST + '/api/provider/confirm?api_token=' + api_token, myInit)
        .then(response => response.json())
}

export function requestConfirmProvider(formData) {
    return fetch(API_HOST + '/api/provider/confirm', {
        method: 'POST',
        body: formData,
        mode: 'cors'
    })
        .then(response => response.json())
}

export function getTargetClass(api_token) {
    return fetch(API_HOST + '/api/provider/get-target-class?api_token=' + api_token, myInit)
        .then(response => response.json())
}

export function getListSubject() {
    return fetch(API_HOST + '/api/getListSubject', myInit)
        .then(response => response.json())
}

export function updateTargetClass(api_token, data, dataToRemove) {
    return fetch(API_HOST + '/api/provider/update-target-class', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + api_token
        },
        body: JSON.stringify({
            data: data,
            dataToRemove: dataToRemove
        }),
        mode: 'cors'
    })
        .then(response => response.json())
}

export function updateUserInfomation(api_token, data) {
    return fetch(API_HOST + '/api/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + api_token
        },
        body: JSON.stringify(data),
        mode: 'cors'
    })
        .then(response => response.json())
}

export function searchProvider(subject, latitude, class_level, api_token) {
    if (api_token === null || api_token === undefined)
        return fetch(API_HOST + '/api/search?subject=' + subject + '&latitude=' + latitude + '&class_level=' + class_level, myInit)
            .then(response => response.json())
    else
        return fetch(API_HOST + '/api/search?subject=' + subject + '&latitude=' + latitude + '&class_level=' + class_level + '&api_token=' + api_token, myInit)
            .then(response => response.json())
}

export function getInfoProvider(api_token, user_id, target_class) {
    if (target_class === undefined)
        return fetch(API_HOST + '/api/enduser/info-provider?api_token=' + api_token + '&provider_id=' + user_id, myInit)
            .then(response => response.json())
    else
        return fetch(API_HOST + '/api/enduser/info-provider?api_token=' + api_token + '&provider_id=' + user_id + '&target_class='
            + target_class, myInit)
            .then(response => response.json())
}

export function getFullInfoProvider(api_token, user_id) {
    return fetch(API_HOST + '/api/enduser/full-info-provider?api_token=' + api_token + '&user_id=' + user_id, myInit)
        .then(response => response.json())
}

export function getReviews(api_token, user_id) {
    return fetch(API_HOST + '/api/enduser/get-review?api_token=' + api_token + '&user_id=' + user_id, myInit)
        .then(response => response.json())
}
export function createReview(api_token, provider_id, content, score) {
    return fetch(API_HOST + '/api/enduser/create-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + api_token
        },
        body: JSON.stringify({
            provider_id: provider_id,
            content: content,
            score: score
        }),
        mode: 'cors'
    })
        .then(response => response.json())
}

export function changeStatusFavorProvider(api_token, provider_id) {
    return fetch(API_HOST + '/api/enduser/change-favor-provider/' + provider_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + api_token
        },
        mode: 'cors'
    })
        .then(response => response.json())
}

export function getFavorProvider(api_token) {
    return fetch(API_HOST + '/api/enduser/get-favor-provider?api_token=' + api_token, myInit)
        .then(response => response.json())
}

export function getRequestProvider(api_token) {
    return fetch(API_HOST + '/api/enduser/get-request-provider?api_token=' + api_token, myInit)
        .then(response => response.json())
}

export function requestProvider(api_token, provider_id, target_class) {
    return fetch(API_HOST + '/api/enduser/request-provider', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + api_token
        },
        body: JSON.stringify({
            provider_id: provider_id,
            target_class: target_class
        }),
        mode: 'cors'
    })
        .then(response => response.json())
}

// Provider API
export function providerGetLearningRequest(api_token) {
    return fetch(API_HOST + '/api/provider/manager-learning-request?api_token=' + api_token, myInit)
        .then(response => response.json())
}

export function deposit(api_token, data) {
    return fetch(API_HOST + '/api/deposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + api_token
        },
        body: JSON.stringify({
            'vpc_Amount': data['vpc_Amount'],
            'vpc_MerchTxnRef': data['vpc_MerchTxnRef'],
            'AgainLink': data['AgainLink']
        }),
        mode: 'cors'
    })
        .then(response => response.json())
}

export function refreshBalance(api_token) {
    return fetch(API_HOST + '/api/refresh-balance?api_token=' + api_token, myInit)
        .then(response => response.json())
}

export function historyTrade(api_token) {
    return fetch(API_HOST + '/api/history-trade?api_token=' + api_token, myInit)
        .then(response => response.json())
}

export function acceptRequest(api_token, id_target_class) {
    return fetch(API_HOST + '/api/provider/accept-request?api_token=' + api_token + '&id=' + id_target_class, myInit)
        .then(response => response.json())
}

export function rejectRequest(api_token, id_target_class) {
    return fetch(API_HOST + '/api/provider/reject-request?api_token=' + api_token + '&id=' + id_target_class, myInit)
        .then(response => response.json())
}