import { configureStore } from '@reduxjs/toolkit';
import addFeatureReducer from './features/addFeature/addFeatureSlice';
import featuresReducer from './features/featuresSlice';
import addPriorityReducer from './priority/AddPriority/addPrioritySlice';
import priorityReducer from './priority/prioritySlice';
import addRoomReducer from './rooms/addRoom/addRoomSlice';
import roomsReducer from './rooms/roomsSlice';
import viewRoomReducer from './rooms/viewRoom/viewRoomSlice';
import userRoomSlice from './UserRooms/userRoomSlice';
import userRoomViewSlice from './UserRoomView/userRoomViewSlice';
import roomScheduleSlice from './roomSchedule/roomScheduleSlice';
import addRoomReservationSlice from './addRoomReservation/addRoomReservationSlice';
import reservedMeetingListSlice from './reservedMeetingList/reservedMeetingListSlice';
import authenticate_user_slice from './authenticateUser/authenticate_user_slice';

export default configureStore({
    reducer: {
      "rooms" : roomsReducer,
      "addRoom" : addRoomReducer,
      "viewRoom" : viewRoomReducer,

      "features" : featuresReducer,  
      "addFeature" : addFeatureReducer,

      "priority" : priorityReducer,
      "addPriority" : addPriorityReducer,

      "userRooms" : userRoomSlice,
      "userRoomView" : userRoomViewSlice,

      "roomSchedule" : roomScheduleSlice,
      "addRoomReservation" : addRoomReservationSlice,

      "reservedMeetingList" : reservedMeetingListSlice,
      "authenticate_user" : authenticate_user_slice
    }
});