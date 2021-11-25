import { FC } from "react";
import clsx from 'clsx';
import { Toolbar, Typography, Tooltip, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from "../../../styles/components/Table/enhancedTableToolbar.styles";

interface IEnhancedTableToolbarProps {
  numSelected: number;
  toolbarTitle: string;
  menuModal?: any;
};

const EnhancedTableToolbar: FC<IEnhancedTableToolbarProps> = (props) => {
  const s = useStyles();
  const { numSelected, toolbarTitle, menuModal } = props;

  return (
    <Toolbar
      className={clsx(s.root, {
        [s.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={s.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={s.title} variant="h6" id="tableTitle" component="div">
          { toolbarTitle }
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Actions">
          <Button
            onClick={(e: any) => menuModal.handleClickMenu(e)}
            className={`btn ${s.withSelectedBtn}`}
            fullWidth
            size={"small"}
            endIcon={<ExpandMoreIcon />}
          >
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;