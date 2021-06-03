import { API } from "../../Backend";


export const uploadPost = (userId, token, data) => {
    return fetch(`${API}/post/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const getAllPosts=(userId,token)=>{
    return fetch(`${API}/post/all/${userId}`,{
      method:"GET",
      headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`
      }
    }).then((response)=>{
      return response.json()
    }).catch((err)=>console.log(err))
  }