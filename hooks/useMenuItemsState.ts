import { MouseEvent, useState } from "react";

const useMenuItemsState = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: MouseEvent<HTMLElement>):void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = ():void => {
    setAnchorEl(null);
  };

  return {
    anchorMenu: anchorEl,
    openMenu: open,
    closeMenu: handleClose,
    handleClickMenu: handleClick
  };
};

export default useMenuItemsState;
