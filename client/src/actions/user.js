import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    window.location.replace('/');
  } catch (error) {
    alert('Invalid Credentials!');
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    window.location.replace('/');
  } catch (error) {
    alert('An error occurred while signing up.')
  }
};

export const updateUser = (id,userData) => async(dispatch) => {
  try {
    const {data} = await api.updateUser(id,userData);

    dispatch({type:'UPDATE_USER',payload:data});
  } 
  catch (error) {
    console.log(error);
  }
}