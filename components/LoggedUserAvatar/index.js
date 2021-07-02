import React, { useState } from 'react';
import { withRouter } from 'next/router';

import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react"

import {
  FiLogOut,
  FiSettings
} from "react-icons/fi";

const LoggedUserAvatar = ({ user = {}, router }) => {
  return (
    <Menu isLazy>
      <MenuButton mr="0.5em">
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_aWx9ofQgdYl4W8khFtiHgh4lY-PH-r0lNc0Tb6narg_-qIb0RQiZVJwnRtQuFgq0EyA&usqp=CAU"
          bg="teal.500"
        />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Walter Pereyra">
          <MenuDivider />
          <MenuItem
            onClick={() => router.push('/settings')}
            icon={<FiSettings />}>Configuraciones</MenuItem>
          <MenuDivider />
          <MenuItem icon={<FiLogOut />}>Cerrar sesión</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default withRouter(LoggedUserAvatar);