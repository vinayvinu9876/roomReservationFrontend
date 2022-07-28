//import store from '../store/store';
export default function(isAdmin=false) {
  console.log('Is admin = ',isAdmin);
 // console.log("Is admin = ",store.getState().authenticate_user.is_admin);
  //if(!store.getState().authenticate_user.is_admin){
  if(!isAdmin){
    return [
      {
        title : "Reserve Room",
        to : "/user-rooms",
        htmlBefore : "<i class='material-icons'>edit</i>",
        htmlAfter : ""
      },
      {
        title : "Meeting List",
        to : "/reservedMeetingView",
        htmlBefore : "<i class='material-icons'>edit</i>",
        htmlAfter : ""
      },
    ];
  }
  return [
    /*{
      title: "Blog Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },*/
    {
      title: "Rooms",
      to: "/rooms",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title : "Reserve Rooms",
      to : "/user-rooms",
      htmlBefore : "<i class='material-icons'>edit</i>",
      htmlAfter : ""
    },
    {
      title : "Meeting List",
      to : "/reservedMeetingView",
      htmlBefore : "<i class='material-icons'>edit</i>",
      htmlAfter : ""
    },
    {
      title: "Features",
      to: "/features",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: "" 
    },
    /*
    {
      title: "Priority",
      to: "/priority",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: "" 
    },
    /*
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },
    {
      title: "Tables",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }*/
  ];
}
