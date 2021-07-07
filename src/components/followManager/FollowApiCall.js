
import { API } from "../../Backend"

export const followHelper = (myId, userId, token) => {
    return fetch(`${API}/follow`, {
        method: "post",
        headers: {
            "Content-Type": 'application/json',
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            "myId": myId,
            "userId": userId
        })
    }).then((resp) => {
        return resp.json()
    }).catch((err) => {
        return console.log(err)
    })

}
export const unfollowHelper = (myId, userId, token) => {
    return fetch(`${API}/unfollow`, {
        method: "post",
        headers: {
            "Content-Type": 'application/json',
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            "myId": myId,
            "userId": userId
        })
    }).then((resp) => {
        return resp.json()
    }).catch((err) => {
        return console.log(err)
    })

}

export const followCheckFront = (myId, userId, token) => {

    return fetch(`${API}/followCheck`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "myId": myId,
            "userId": userId
        })
    }).then((resp) => {
        return resp.json()
    }).catch((err) => {
        console.log(err)
    })
}