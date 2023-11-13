import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../../assets/react.svg";
import user from "../../../assets/react.svg";
import {
    AiOutlineHome,
    AiOutlineUserSwitch,
    AiOutlineSearch,
    AiOutlineMessage,
    AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import './index.scss'
import ProfilePopup from "../ProfilePopup";

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

            <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
            {isSearch ? (
                <SearchUsers
                    setIsSearch={setIsSearch}
                    setSearchInput={setSearchInput}
                />
            ) : (
                <div className="react-icons">
                    <AiOutlineSearch
                        size={30}
                        className="react-icon"
                        onClick={() => setIsSearch(true)}
                    />
                    <AiOutlineHome
                        size={30}
                        className="react-icon"
                        onClick={() => goToRoute("/home")}
                    />
                    <AiOutlineUserSwitch
                        size={30}
                        className="react-icon"
                        onClick={() => goToRoute("/connections")}
                    />
                    <BsBriefcase size={30} className="react-icon" />
                    <AiOutlineMessage size={30} className="react-icon" />
                    <AiOutlineBell size={30} className="react-icon" />
                </div>
            )}

            <img
                className="user-logo"
                src={currentUser?.imageLink}
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