import React, { useEffect, useState } from "react";
import BebopLogo from "../../../assets/BebopLogo.png";
import user from "../../../assets/user.png";
import {
    AiOutlineHome,
    AiOutlineUserSwitch,
    AiOutlineSearch,
    AiOutlineMessage,
    AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import ProfilePopup from "../ProfilePopup";
import './index.scss'

function Topbar({currentUser}) {
    const [popupVisible, setPopupVisible] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    let navigate = useNavigate();
    
    const goToRoute = (route) => {
        navigate(route);
      };

    const displayPopup = () => {
        setPopupVisible(!popupVisible);
    };  
    return (
        <div className="topbar-main">
            {popupVisible ? (
                <div className="popup-position">
                    <ProfilePopup />
                </div>
            ) : ( 
             <></>
            )} 

            <img className="bebop-logo" src={BebopLogo} alt="BebopLogo" />

            {isSearch 
            ? (
                <SearchUsers
                    setIsSearch={setIsSearch}
                    setSearchInput={setSearchInput}
                />
            ) : (
                <div className="react-icons-container"> 
                <div className="react-icons">
                    <AiOutlineSearch   //search icon
                        size={30}
                        className="react-icon"
                        // onClick={() => setIsSearch(true)}
                    />
                    <AiOutlineHome    //home icon
                        size={30}
                        className="react-icon"
                        onClick={() => goToRoute("/home")}
                    />
                    <AiOutlineUserSwitch  //user icon
                        size={30}
                        className="react-icon"
                        onClick={() => goToRoute("/connections")}
                    />
                    <BsBriefcase 
                        size={30} 
                        className="react-icon"
                    />  
                    <AiOutlineMessage  //messaging icon
                        size={30}
                        className="react-icon" 
                    />  
                    <AiOutlineBell  //bell icon for notifications
                        size={30} 
                        className="react-icon"
                   />
                </div>
                </div>
            )}

            <img
                className="user-logo"
                
                src={(currentUser?.imageLink)||user}
                alt="user"
                onClick={displayPopup}
            />


            {searchInput.length === 0 ? (
                <></>
            ) : (
                <div className="search-results">
                    {filteredUsers.length === 0 ? (
                        <div className="search-inner">No Results Found..</div>
                    ) : (
                        filteredUsers.map((user) => (
                            <div className="search-inner" onClick={() => openUser(user)}>
                                <img src={user.imageLink} />
                                <p className="name">{user.name}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>

    )
}

export default Topbar