import React from "react";
import styled from "@emotion/styled";
import { Power } from "react-feather";
import { useNavigate } from "react-router-dom";

import {
    Tooltip,
    Menu,
    MenuItem,
    IconButton as MuiIconButton,
} from "@mui/material";

import useAuth from "../../hooks/useAuth";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function Logout() {
    const [anchorMenu, setAnchorMenu] = React.useState<any>(null);
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const toggleMenu = (event: React.SyntheticEvent) => {
        setAnchorMenu(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorMenu(null);
    };

    const handleSignOut = async () => {
        await signOut();
        navigate("/");
    };

    return (
        <React.Fragment>

            <div onClick={handleSignOut}>Sign out</div>

        </React.Fragment>
    );
}

export default Logout;
