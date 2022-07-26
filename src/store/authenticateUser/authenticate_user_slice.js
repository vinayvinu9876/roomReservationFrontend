import { createSlice } from '@reduxjs/toolkit';
import authenticate_user from "./authenticate_user";
import getSideNavBarItems from '../../data/sidebar-nav-items';

const initialState = {
    loading : false,
    errMessage : null,
    logged_in : false,
    auth_token : null, 
    is_admin : false, 

    navItems : getSideNavBarItems()
};

if(localStorage.getItem("authToken")){
    initialState["auth_token"] = localStorage.getItem("authToken");
}

if(localStorage.getItem("is_admin")){
    initialState["is_admin"] = localStorage.getItem("is_admin")==="true";
    console.log("Local storage is admin = ",initialState["is_admin"]," type = ",typeof(initialState["is_admin"]));
    initialState["navItems"] = getSideNavBarItems(initialState["is_admin"]);
}


const authenticate_user_slice = createSlice({  

    name : "authenticate_user",
    initialState : initialState,
    reducers : {    
        authenticatingUser(state,action){
            state.loading = true;
            state.errMessage = null;
            state.logged_in = false;
        },

        userAuthenticatedSuccesfully(state,action){
            state.loading = false;
            state.errMessage = null;
            state.logged_in = true;
            state.auth_token = action.payload["token"];
            state.is_admin = action.payload["is_admin"];
            localStorage.setItem("authToken",action.payload["token"]);
            localStorage.setItem("is_admin",action.payload["is_admin"]);
            state.navItems = getSideNavBarItems(action.payload["is_admin"]);
        },

        userAuthenticationFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.logged_in = false;
        }
    }

})

export {authenticate_user};

export const {authenticatingUser, userAuthenticatedSuccesfully, userAuthenticationFailed} = authenticate_user_slice.actions;

export default authenticate_user_slice.reducer;    