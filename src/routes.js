import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Rooms from "./views/Rooms";
import AddRoom from "./views/Rooms/AddRoom";
import Features from "./views/Features";
import AddFeature from "./views/Features/addFeature";
import Priority from "./views/Priority";
import AddPriority from "./views/Priority/addPriority";
import ViewRoom from "./views/Rooms/ViewRoom";
import UserRooms from "./views/UserRooms";
import UserRoomView from "./views/UserRoomView";
import ReservedMeetingView from "./views/ReservedMeetingView";
import AuthenticateUser from './views/AuthenticateUser';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/authenticate-user?user_info=bWxaR3g1M1YyRXQrMFl5bzdqSDViNkdSWjhBaFQzNGVUWGFLOW9zRFNlTlJRWHQ3OXp4SXZqelp6OElyaktyc1luVmZDcUczUUJJaGdpRkpqY0d2YzRBWkdJNHVzQURJM3hMeXNYTjJlLzcrWUhnaGYvSmRBZUZGOVNyVnVRSysrNEwyVkpaYnFnWmRDL09sWEFXYThkV3lxWnduT1BGMXVEOWEwOC9ZRTF5RUlhWWlPa1g3dmEweXh3KzBuV1ZadVhFNW9FT043VGlDNzJ5MjlXNGRKMnhXWGZOZTdIOXAvU1ovb1E3b3BhdFM3UE1JbXZSRlFnMWl1cS9tR21yNjByaXd3R3RINlhVa0Z6L0NkUXI5eTU0bzdHdFpMdndWdWdjQ0VwbU0rZ0lqb05CVmFuTXVyUVQzYzF2YUp1Q08wZWhWcExLeFQ4K2h4dktFMHBIZmZWY1BhQTlPeFdtT3JhNEVxczMrdzI5Y0R3d1BMVVZXOWRiejZpZ1p6WXhCUFdYcDhVWFFKZVYyaUoreHZhSFdiZW1ET3IwblAxR2o0NGRmTU9lYTBZUnRhdDVIK3FJV0dmREFmWWZDKzRjNUlreTE3TEd0MWludFNLN0I3T0VkcStBMC85WGt0Y2tLeWd4YmMxVXBtSS9paURtUWR4K1Z0aGtGOS9KMCtjRVFLbGgvWHFwY3doMW5GV29Jd3ZOVWhJM3BaMlRIL3l2eGRLc2l0WWVVekFNSWY5TG9mNFIyckdaVkQxQmx6Z09ZZkc0R3E4cElYaXpFQTdMUHpha3ZOT0dMKytuc1pEbzJ2dE1vSm52Q2FFLzZjVWRGd09IVkVaSlFLR1BWS0pJMTJXdjRaVy9xdHVMOGtBYnJKbjFOanJpUEFVZXhiYy9YdnhmU2l4VktRVHhnK1c2SGgxUmJGeUUzU3JZK21UT1JXelRwWEkydHlDZm10QU5JdmY2WXkreW5iUG9hZGx3aUxEaWdHaUREQjh5Qk5McHQ3V3R6c3JlYXloOHl1TXcxUHRRdTh3RWVILzcvZHNvQ2RJZEIveVhMUUlHbFlFeGFqRThhZm9jWFJKSTNRa3lVYmFlZ0lhYnplZU1Id2xQbHZuVVZ4R3hOSUdjeW81RDEyVlBlZHBnSXZVR1RoV09ab3UxZnhtRUVrZERaZXh3WjJxSXhoT1RkM00rWTB1RklQeVBnemdNT1pQWkNiVG9lVjdmNjZ6b2JwdEh5dENpOGZiMGtWdmwyOEd4WDMwZ0JNM1RSRHNkRzlRM0syTldXVEs3WDR6ZXN1b0p1VjU1MVR0cUdqR3BqaTNHaGovc0c5TldheTNweG1IWlFuYVlMVXpKWkpEcENzcGFtcjlVVGZJcUs3WTBDSHlySU94NFFVazJ0akhzNVY2Y2NYMXdkdDhWMG4rYm5HaGpPd3Q1VEppc2doZmtiYzFrTEJ0RVQ5WXVHdGdjN0NMSlhvS3FKZTZZSmVrS2VBQjM0dFJzckE5VmxHOE5zQWZudU40blptQnJabW4vRkxHNWwwOTM3YmlMaGRRUVlIV0laUUpDaHA1UWlHUT09" />
  },
  {
    path : '/authenticate-user',
    layout : DefaultLayout,
    component :AuthenticateUser
  },
  {
    path : '/userRoomView',
    layout : DefaultLayout,
    component : UserRoomView
  },
  {
    path : "/reservedMeetingView",
    layout : DefaultLayout,
    component : ReservedMeetingView
  },
  {
    path : "/rooms",
    layout : DefaultLayout,
    component : Rooms
  },
  {
    path :  "/viewRoom",
    layout : DefaultLayout,
    component : ViewRoom,
  },
  {
    path : "/features",
    layout : DefaultLayout,
    component : Features
  },
  {
    path : "/addFeature",
    layout : DefaultLayout,
    component : AddFeature
  },
  {
    path : "/addRoom",
    layout : DefaultLayout,
    component : AddRoom
  },
  {
    path : "/addPriority",
    layout : DefaultLayout,
    component : AddPriority
  },
  {
    path : "/priority",
    layout : DefaultLayout,
    component : Priority
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path : "/user-rooms",
    layout : DefaultLayout,
    component : UserRooms
  }
];
