import axios from "axios";
import API from "../backend";
import { isAutheticated } from "../auth/helper/index";


axios.interceptors.request.use(function (config) {
  const details = isAutheticated();
  if (details) {
    config.headers.Authorization = `Bearer ${details.token}`;
  }

  return config;
});

//** USER ROUTES */
//! get user
export const getUser = (user_id) => {
  return axios
    .get(`${API}/user/${user_id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//! update user
export const updateUser = (user_id, data) => {
  return axios
    .put(`${API}/user/${user_id}`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
//!update user profileImage
export const updateProfileImage = (user_id, data) => {
  return axios
    .put(`${API}/user/profileImage/${user_id}`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//** POST ROUTES */
//! get all POSTS
export const getAllPosts = () => {
  return axios
    .get(`${API}/post`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//! get one POST
export const getPost = (author_id, id) => {
  return axios
    .get(`${API}/post/${author_id}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//! get user POST list
export const getUserPostList = (id) => {
  return axios
    .get(`${API}/user/post/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//! CREATE NEW POST
export const createPost = (body, id) => {
  console.log(id);
  return axios
    .post(`${API}/post/create/${id}`, body)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.request) {
        return err.request;
      } else if (err.response) {
        return err.response;
      } else {
        return err;
      }
    });
};

//! UPDATE POST
export const updatePost = (body, author_id, id) => {
  return axios
    .put(`${API}/post/update/${author_id}/${id}`, body)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const updatePublishStatusInPost = (body, author_id, id) => {
  return axios
    .put(`${API}/post/publishUpdate/${author_id}/${id}`, body)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//! DELETE post
export const deletePost = (author_id, id) => {
  return axios
    .delete(`${API}/post/delete/${author_id}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//**COMMENT ROUTES */
//! CREATE comment
export const createComment = (postId, author_id, text) => {
  return axios
    .post(`${API}/comment/post/${postId}/${author_id}`, text)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const createChildComment = (commentId, postId, author_id, text) => {
  return axios
    .post(`${API}/child/comment/post/${commentId}/${postId}/${author_id}`, text)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//! GET comment
export const getCommentByPost = (postId) => {
  return axios
    .get(`${API}/allComments/post/${postId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
