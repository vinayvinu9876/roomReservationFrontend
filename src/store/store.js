import { configureStore } from '@reduxjs/toolkit';
import addFeatureReducer from './features/addFeature/addFeatureSlice';
import featuresReducer from './features/featuresSlice';
import addPriorityReducer from './priority/AddPriority/addPrioritySlice';
import priorityReducer from './priority/prioritySlice';
import addRoomReducer from './rooms/addRoom/addRoomSlice';
import roomsReducer from './rooms/roomsSlice';

export default configureStore({
    reducer: {
      "rooms" : roomsReducer,
      "addRoom" : addRoomReducer,

      "features" : featuresReducer,  
      "addFeature" : addFeatureReducer,

      "priority" : priorityReducer,
      "addPriority" : addPriorityReducer,
    }
});