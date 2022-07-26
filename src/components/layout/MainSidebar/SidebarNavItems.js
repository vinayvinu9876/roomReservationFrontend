import React from "react";
import { Nav } from "shards-react";
import SidebarNavItem from "./SidebarNavItem";
import { useSelector } from "react-redux";

const SidebarNavItems = () =>{

  let navItems = useSelector(state=>state.authenticate_user.navItems);

  //let [navItems,setNavItems] = useState(Store.getSidebarItems());

  //const isAdmin = useSelector(state=>state.authenticate_user.is_admin);

  /*
  if(isAdmin){
    console.log("User is admin. Reredenring");
    setNavItems(getSideBarNavItems(isAdmin));
  }
  */

  /*
  useEffect(()=>{
    Store.addChangeListener(setNavItems);
    return ()=>{
      Store.removeChangeListener(setNavItems);
    }
  },[]);
  */

  return (
    <div className="nav-wrapper">
      <Nav className="nav--no-borders flex-column">
      {navItems.map((item, idx) => (
        <SidebarNavItem key={idx} item={item} />
      ))}
      </Nav>
    </div>
  )


}


export default SidebarNavItems;
