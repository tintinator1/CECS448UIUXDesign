import { NavLink } from "react-router-dom";
import { IoHomeSharp, IoHomeOutline, IoPersonOutline, IoPersonSharp, IoSchoolOutline, 
    IoSchool, IoCalendarClearOutline, IoCalendarClear, IoLink, IoLinkOutline    } from "react-icons/io5";

const navItems = [
  {
    path: "/dashboard",
    outlineIcon: <IoHomeOutline />,
    filledIcon: <IoHomeSharp />,
  },
  {
    path: "/degree-pathway",
    outlineIcon: <IoSchoolOutline />,
    filledIcon: <IoSchool />,
  },
  {
    path: "/deadlines",
    outlineIcon: <IoCalendarClearOutline />,
    filledIcon: <IoCalendarClear />,
  },
  {
    path: "/help",
    outlineIcon: <IoLinkOutline />,
    filledIcon: <IoLink />,
  },
  {
    path: "/profile",
    outlineIcon: <IoPersonOutline />,
    filledIcon: <IoPersonSharp />,
  },
];

export default function BottomNavBar() {
  return (
    <nav style={bottomNavStyle}>
      {navItems.map((item) => (
        <NavLink key={item.path} to={item.path} style={navItemStyle}>
          {({ isActive }) =>
            isActive ? item.filledIcon : item.outlineIcon
          }
        </NavLink>
      ))}
    </nav>
  );
}

const bottomNavStyle = {
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  height: "clamp(56px, 15vw, 71px)",
  backgroundColor: "#d9d9d9",
  borderRadius: "clamp(12px, 4vw, 15px) clamp(12px, 4vw, 15px) 0 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  zIndex: 1000,
};

const navItemStyle = {
  width: "clamp(20px, 5vw, 23px)",
  height: "clamp(20px, 5vw, 23px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  fontSize: "clamp(20px, 5vw, 23px)",
  textDecoration: "none",
};