import React, { useState, useEffect } from 'react'

import { followCheckFront, followHelper, unfollowHelper } from './FollowApiCall'

import "./followStyle.css"
function FollowUnfollow({ myId, userId, token }) {

    const [following, setFollowing] = useState(false)


    useEffect(() => {

        setTimeout(() => {

            followCheckFront(myId, userId, token)
                .then((resp) => {
                    if (resp == true) {
                        setFollowing(true)
                    }
                    else {
                        setFollowing(false)
                    }
                }).catch((err) => {
                    console.log(err)
                })
        }, 200)

    }, [])
    const followUnfollowController = () => {

        if (following === false) {
            followHelper(myId, userId, token).then((resp) => {
                console.log(resp)
                setFollowing(!following)
            })
        }
        else {
            unfollowHelper(myId, userId, token).then((resp) => {
                console.log(resp)
                setFollowing(!following)
            })
        }
    }
    return (
        <div onClick={() => { followUnfollowController() }} className="follow-unfollow-body">
            {
                following === true ? <div>Unfollow</div> : <div>Follow</div>
            }
        </div>
    )
}

export default FollowUnfollow
