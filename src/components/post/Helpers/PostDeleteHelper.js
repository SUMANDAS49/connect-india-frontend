import { API } from "../../../Backend";

export const deletePost = (postId, userId, token) => {
  return fetch(`${API}/post/delete/${postId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((post)=>{
      return post.json()
  }).catch((err)=>{
      console.log(err)
  });
};
