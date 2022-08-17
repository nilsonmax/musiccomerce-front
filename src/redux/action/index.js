import axios from "axios";

// import { applyMiddleware } from "redux";

export const GET_INSTRUMENTS = "GET_INSTRUMENTS";
export const GET_DETAILS_INSTRUMENTS = "GET_DETAILS_INSTRUMENTS";
export const POST_CREATE = "POST_CREATE";
export const DATA_CLEAR = "DATA_CLEAR";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const ORDERED = "ORDERED";
export const GET_USER = "GET_USER";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const SHOW_LOGIN = "SHOW_LOGIN";
export const GET_USERS = "GET_USERS";
export const DELETE_INSTRUMENT = "DELETE_INSTRUMENT";

const { REACT_APP_HOST } = process.env;
// const REACT_APP_HOST = "${REACT_APP_HOST}";
console.log(REACT_APP_HOST, "url");

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      // const resp = await axios.get(`${REACT_APP_HOST}/instruments?name=${name}`)
      const resp = await axios.get(
        `${REACT_APP_HOST}/instruments?name=${name}`
      );
      return dispatch({
        type: GET_BY_NAME,
        payload: resp.data,
      });
    } catch (error) {
      // console.log(error, "error resp.data");
    }
  };
};

export const getDataClear = (payload) => {
  return {
    type: DATA_CLEAR,
    payload,
  };
};

export const get_instrumentID = (id) => {
  return async function (dispatch) {
    try {
      let api = await axios.get(`${REACT_APP_HOST}/instruments/` + id);

      return dispatch({
        type: GET_DETAILS_INSTRUMENTS,
        payload: api.data,
      });
    } catch (error) {
      console.log("error in redux/action/get_instrumentID : " + error);
      return "error in redux/action/get_instrumentID : " + error;
    }
  };
};

export const getInstruments = () => {
  return async function (dispatch) {
    return await axios
      .get(`${REACT_APP_HOST}/instruments`)
      .then((rAxios) => {
        dispatch({
          type: GET_INSTRUMENTS,
          payload: rAxios.data,
        });
      })
      .catch((error) => {
        console.log("error in redux/action/getInstruments : " + error);
        return "error in redux/action/getInstruments : " + error;
      });
  };
};

export const getAllCategories = () => {
  return async function (dispatch) {
    try {
      let categories = await axios.get(`${REACT_APP_HOST}/category/all`);
      return dispatch({
        type: "GET_ALL_CATEGORIES",
        payload: categories.data,
      });
    } catch (error) {
      throw new TypeError(error.response);
    }
  };
};

export const postInstrument = (payload,token) => {
  return async function (dispatch) {
    try {
    let tokenJSON = JSON.parse(token);
      let newInstrument = await axios.post(
        `${REACT_APP_HOST}/instruments`,
        payload,{
          headers: {
            Authorization: `Bearer ${tokenJSON.token}`,
          },
        }
      );
      return newInstrument.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};

export const sortName = function (payload) {
  return {
    type: "ORDERED",
    payload,
  };
};

export const filterByCategory = function (payload) {
  return {
    type: "FILTER_BY_CATEGORY",
    payload,
  };
};

export const showLogin = function (payload) {
  return {
    type: "SHOW_LOGIN",
    payload,
  };
};

export const registerUser = (objectUser) => {
  return async function () {
    try {
      let newUser = await axios.post(
        `${REACT_APP_HOST}/auth/register`,
        objectUser
      );
      return newUser.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};

export const loginUser = (objectUser) => {
  return async function () {
    try {
      let newUser = await axios.post(
        `${REACT_APP_HOST}/auth/login`,
        objectUser
      );
      window.localStorage.setItem("dataUser", JSON.stringify(newUser.data));
      console.log("tu token: " + newUser.data);
      return newUser.data;
    } catch (error) {
      throw new TypeError(error.response.data);
    }
  };
};

export const updateUserInfo = (payload) => {
  return async function () {
    let token = window.localStorage.getItem("dataUser");
    let tokenJSON = JSON.parse(token);
    try {
      let userUpdated = await axios.put(
        `${REACT_APP_HOST}/users`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${tokenJSON.token}`,
          },
        }
      );
      console.log("TOKEN: ", window.localStorage.getItem("token"));
      console.log("USERUPDATED", userUpdated);
      return userUpdated.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const get_user = (token) => {
  return async function (dispatch) {
    //let token = window.localStorage.getItem("dataUser")
    let tokenJSON = JSON.parse(token);
    try {
      let usuario = await axios.get(`${REACT_APP_HOST}/users/token`, {
        headers: {
          Authorization: "Bearer " + tokenJSON.token,
        },
      });
      return dispatch({
        type: GET_USER,
        payload: usuario.data,
      });
    } catch (error) {}
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    return await axios
      .get(`${REACT_APP_HOST}/users`)
      .then((resp) => {
        dispatch({
          type: GET_USERS,
          payload: resp.data,
        });
      })
      .catch((error) => {
        throw new TypeError(error.response.data);
      });
  };
};

export const deleteUser = (user_id) => {
  return async function () {
    try {
      let userDeleted = await axios.delete(
        `${REACT_APP_HOST}/users/${user_id}`
      );
      return userDeleted.data;
    } catch (error) {
      throw new TypeError(error.response.data);
    }
  };
};

export const deleteCategory = (category_id,token) => {
  return async function () {
    try {
    let tokenJSON = JSON.parse(token);
      let categoryDeleted = await axios.delete(
        `${REACT_APP_HOST}/category`,{data: {
          id: category_id
        },
          headers: {
            Authorization: "Bearer " + tokenJSON.token,
          }
        }
      );
      return categoryDeleted.data;
    } catch (error) {
      throw new TypeError(error.response.data);
    }
  };
};

export const deleteInstrument = (id,token) => {
  return async function () {
    try {
    let tokenJSON = JSON.parse(token);
      let instrumentDeleted = await axios.delete(
        `${REACT_APP_HOST}/instruments`,{data: {
          id: id
        },
          headers: {
            Authorization: "Bearer " + tokenJSON.token,
          }
        }
      );
      return instrumentDeleted.data;
    } catch (error) {
      throw new TypeError(error.response.data);
    }
  };
};

export const putUser = (objectUser, token) => {
  return async function () {
    try {
      let tokenJSON = JSON.parse(token);
      objectUser = camposNullUser(objectUser);
      let newUser = await axios.put(`${REACT_APP_HOST}/users/admin`, objectUser, {
        headers: {
          Authorization: "Bearer " + tokenJSON.token,
        },
      });
      return newUser.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};

export const putUserAdmin = (objectUser, token) => {
  return async function () {
    try {
      let tokenJSON = JSON.parse(token);
      objectUser = camposNullUser(objectUser);
      let newUser = await axios.put(`${REACT_APP_HOST}/users/admin`, objectUser, {
        headers: {
          Authorization: "Bearer " + tokenJSON.token,
        },
      });
      return newUser.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};

function camposNullUser(objectUser) {
  if (objectUser.dni === "") {
    objectUser.dni = null;
  }
  if (objectUser.contactNumber === "") {
    objectUser.contactNumber = null;
  }
  if (objectUser.firstName === "") {
    objectUser.firstName = null;
  }
  return objectUser;
}

export const postUser = (objectUser) => {
  return async function () {
    try {
      objectUser = camposNullUser(objectUser);
      let newUser = await axios.post(`${REACT_APP_HOST}/users`, objectUser);
      return newUser.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};

export const postCategory = (objectCategory,token) => {
  return async function () {
    try {
      let tokenJSON = JSON.parse(token);
      let newCategory = await axios.post(`${REACT_APP_HOST}/category`, objectCategory,{headers: {
        Authorization: "Bearer " + tokenJSON.token,
      }});
      return newCategory.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};

export const putInstrument = (objectInstrument, token) => {
  return async function () {
    try {
      let tokenJSON = JSON.parse(token);
      let newInstrument = await axios.put(
        `${REACT_APP_HOST}/instruments`,
        objectInstrument,
        {
          headers: {
            Authorization: "Bearer " + tokenJSON.token,
          },
        }
      );
      return newInstrument.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};

export const putCategory = (objectCategory, token) => {
  return async function () {
    try {
      let tokenJSON = JSON.parse(token);
      let newCategory = await axios.put(
        `${REACT_APP_HOST}/category`,
        objectCategory,
        {
          headers: {
            Authorization: "Bearer " + tokenJSON.token,
          },
        }
      );
      return newCategory.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};