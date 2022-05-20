import { createSlice } from '@reduxjs/toolkit';
import addRoom from './addRoom';

const initState = {
    loading : false,
    errMessage: null,
    successMessage:  null,

    room_name : null, 
    room_desc : null,
    room_capacity : null,
    status : null,

    room_images : [],     // {image : <uri_data> , filename : <string> }
    room_features : [],   // {feature_id : <number> ,feature_name : <string>, no_of_items : <number> ,total_available : <number> }
    room_down_time : [] , // {day: <string> , start : <time> , end : <time> , desc : <string> } 
};


const addRoomSlice = createSlice({
    name : "addRoom",
    initialState : initState,
    reducers : {

        setAddingRoom(state,action){
            state.loading = true;
            state.errMessage = null;
            state.successMessage = null;
        },

        setAddingRoomFailed(state,action){
            state.loading = false;
            state.errMessage = action.payload;
            state.successMessage = null;
        },

        setAddingRoomSuccess(state,action){
            state.loading = false;
            state.errMessage = null;
            state.successMessage = action.payload;
        },

        setFieldValue(state,action){
            const fieldName = action.payload.fieldName;
            const value = action.payload.value;

            switch(fieldName){
                case "room_name"        : state.room_name       = value;break;
                case "room_desc"        : state.room_desc       = value;break;
                case "room_capacity"    : state.room_capacity   = value;break;
                case "status"           : state.status          = value;break;
                default                 : console.log("nothing happened");break;
            }
        },

        addRoomImage(state,action){
            state.room_images = action.payload;
            console.log("room images = ",state.room_images);
        },

        addRoomFeature(state,action){
            const feature_id = action.payload.feature_id;
            const no_of_items = action.payload.no_of_items;
            const feature_name = action.payload.feature_name;
            const total_available = action.payload.total_available;

            let featuresList = [...state.room_features];   
            
            for(let i=0;i<featuresList.length;i++){
                if(featuresList[i]["id"]===feature_id){
                    window.alert("Feature already exists");
                    return;
                }
            }

            console.log("Feature id = ",feature_id," no of items = ",no_of_items," Feature name = ",feature_name);

            if(no_of_items===0 ||  no_of_items===null ){
                window.alert("No of items cannot be 0");
                return;
            }


            if(no_of_items > total_available){
                window.alert("No of items cannot be more than available items");
                return;
            }

            if(feature_id===null){
                window.alert("Feature id cannot be null");
                return;
            }

            featuresList.push({feature_id , no_of_items ,feature_name , total_available});

            console.log('Feature list = ',featuresList);

            state.room_features = featuresList;
        },

        incrementRoomFeature(state,action){
            const feature_id = action.payload.feature_id;
            const value = parseInt(action.payload.value);

            const shadow = [...state.room_features];

            for(let i=0;i<shadow.length;i++){
                if(shadow[i]["feature_id"]===feature_id){
                    let no_of_items = parseInt(shadow[i]["no_of_items"]);
                    const total_available = parseFloat(shadow[i]["total_available"]);
                    if( (no_of_items+value) <= (total_available) ){
                        shadow[i]["no_of_items"] = (no_of_items + value);
                    }
                }
            }

            state.room_features = shadow;
        },

        decrementRoomFeature(state,action){
            const feature_id = action.payload.feature_id;
            const value = parseInt(action.payload.value);

            const shadow = [...state.room_features];

            for(let i=0;i<shadow.length;i++){
                if(shadow[i]["feature_id"]===feature_id){
                    const no_of_items = parseInt(shadow[i]["no_of_items"]);
                    if( (no_of_items - value) < 0 ){
                        return;
                    }
                    shadow[i]["no_of_items"] = no_of_items - value;
                }
            }

            state.room_features = shadow;
        },

        removeFromRoomFeatures(state,action){
            const feature_id = action.payload.feature_id;
            
            const shadow = [...state.room_features];

            let idx = null;

            for(let i=0;i<shadow.length;i++){
                if(shadow[i]["feature_id"]===feature_id){
                    idx = i;
                }
            }

            if(idx===null){
                return;
            }
            shadow.splice(idx,1);

            state.room_features = shadow;
        },

        addRoomDownTime(state,action){
            const day = action.payload.day;
            const start = action.payload.start;
            const end = action.payload.end;
            const desc = action.payload.desc;

            console.log("Paylaod = ",action.payload);

            const days = ["sun","mon","tue","wed","thu","fri","sat"];

            if((!day) || (!days.includes(day)) ){
                window.alert("Day is not valid");
                return;
            }

            if(!start){
                window.alert("Start is not valid");
                return;
            }

            if(!end){
                window.alert("End is not valid");
                return;
            }

            if(!desc){
                window.alert("Descripiton is not valid");
                return;
            }

            if(start>=end){
                window.alert("Invalid start and end time");
                return;
            }

            const shadow = [...state.room_down_time];

            for(let i=0;i<shadow.length;i++){
                if(shadow[i]["day"]===day && shadow[i]["start"]===start && shadow[i]["end"]===end){
                    window.alert("Down time already exists");
                    return;
                }
            }

            shadow.push({day,start,end,desc});

            state.room_down_time = shadow;
        },

        removeFromDownTime(state,action){
            const idx = action.payload;

            const shadow = [...state.room_down_time];

            if(shadow.length < idx){
                return;
            }

            shadow.splice(idx,1);

            state.room_down_time = shadow;
        }

    }

});


export {addRoom};

export const {  
            setAddingRoom,
            setAddingRoomFailed,
            setAddingRoomSuccess,
            setFieldValue,
            addRoomImage,
            addRoomFeature,
            addRoomDownTime,
            incrementRoomFeature,
            decrementRoomFeature,
            removeFromRoomFeatures,
            removeFromDownTime
        } = addRoomSlice.actions;

export default addRoomSlice.reducer;