import React, { useEffect, useState } from "react";
import BebopLogo from "../../../assets/BebopLogo.png";
import user from "../../../assets/user.png";
import SearchUsers from "../SearchUsers";
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
import { getAllUsers } from "../../../api/FirestoreAPI"; 
import defaultUser from '../../../assets/user.png'

function Topbar({ currentUser }) {
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

    const openUser = (user) => {
        navigate("/profile", {
            state: {
                id: user.id,
                email: user.email,
            },
        });
    };

    const handleSearch = () => {
        if (searchInput !== "") {
            let searched = users.filter((user) => {
                return Object.values(user)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });

            setFilteredUsers(searched);
        } else {
            setFilteredUsers(users);
        }
    };

    useEffect(() => {
        let debounced = setTimeout(() => {
            handleSearch();
        }, 1000);

        return () => clearTimeout(debounced);
    }, [searchInput]);

    useEffect(() => {
        getAllUsers(setUsers);
    }, []);

    return (
        <div className="topbar-main">
            {popupVisible ? (
                <div className="popup-position">
                    <ProfilePopup />
                </div>
            ) : (
                <></>
            )}

            <div className="logo">
                <img className="bebop-logo" src={BebopLogo} alt="BebopLogo" />
            </div>

            <div className="react-icons-container">
            {isSearch
                ? (
                    <SearchUsers
                        setIsSearch={setIsSearch}
                        setSearchInput={setSearchInput}
                    />
                ) : (
                        <div className="react-icons">
                            <AiOutlineSearch   //search icon
                                size={30}
                                className="react-icon"
                                onClick={() => setIsSearch(true)}
                            />
                            <AiOutlineHome    //home icon
                                size={30}
                                className="react-icon"
                                onClick={() => goToRoute("/home")}
                            />
                            <AiOutlineUserSwitch  //connections icon
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
                )}
                </div>

            <div className="user">
                <div className="user-profile">
                    <img
                        className="user-logo"
                        src={(currentUser?.imageLink) || user}
                        alt="user"
                        onClick={displayPopup}
                    />
                </div>
            </div>


            {searchInput.length === 0 ? (
                <></>
            ) : (
                <div className="search-results">
                    {filteredUsers.length === 0 ? (
                        <div className="search-inner">No results found...</div>
                    ) : (
                        filteredUsers.map((user,index) => (
                            <div key={index} className="search-inner" onClick={() => openUser(user)}>
                                <img src={user.imageLink||defaultUser} />
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