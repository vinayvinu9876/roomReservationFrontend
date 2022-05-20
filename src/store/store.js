import { configureStore } from '@reduxjs/toolkit';
import addFeatureReducer from './features/addFeature/addFeatureSlice';
import featuresReducer from './features/featuresSlice';
import addPriorityReducer from './priority/AddPriority/addPrioritySlice';
import priorityReducer from './priority/prioritySlice';
import addRoomReducer from './rooms/addRoom/addRoomSlice';
import roomsReducer from './rooms/roomsSlice';
import viewRoomReducer from './rooms/viewRoom/viewRoomSlice';

export default configureStore({
    reducer: {
      "rooms" : roomsReducer,
      "addRoom" : addRoomReducer,
      "viewRoom" : viewRoomReducer,

      "features" : featuresReducer,  
      "addFeature" : addFeatureReducer,

      "priority" : priorityReducer,
      "addPriority" : addPriorityReducer,
    }
});