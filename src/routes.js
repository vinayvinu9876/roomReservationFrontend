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

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path : "/rooms",
    layout : DefaultLayout,
    component : Rooms
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
  }
];
