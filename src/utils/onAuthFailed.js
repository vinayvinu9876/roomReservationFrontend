const checkIfAuthFailed = (res) =>{
    if(res.data["unauthorized_flag"]===1){
        localStorage.setItem("authToken",null);
        localStorage.setItem("is_admin",null);
        console.log("res.data = ",res.data);
        //window.location.href = "https://apps.ffreedom.com/new_apps/";
    }
}

export default checkIfAuthFailed;