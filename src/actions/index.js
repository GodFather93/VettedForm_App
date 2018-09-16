import axios from "axios";

export const CREATE_POSTS = "create_posts";

export function createPost(values, callback) {
  const request = axios
    .post(`https://fast-plateau-57402.herokuapp.com/vetted`, values)
    .then(() => callback());
  return {
    type: CREATE_POSTS,
    payload: request
  };
}
