import { FC } from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { ArrowUpIcon } from "../../../common/icons/index";
import StyledMaterialCheckbox from "../../../controls/MaterialCheckBox";
import { useStyles } from "../../../styles/components/Table/enhancedTableHead.styles";

const EnhancedTableHead: FC<any> = (props) => {
  const { onSelectAllClick, order, orderBy, numSelected, 
    rowCount, onRequestSort, headCells, withSelect } = props;
  const s = useStyles();

  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        { withSelect &&
          <TableCell padding="checkbox">
            <StyledMaterialCheckbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }} 
            />
          </TableCell>
        }   
        {headCells.map((headCell: any) => {
          const rowAlign =
            headCell?.id === "actions" && headCells.length <= 5
              ? "right"
              : "left";
          return (
            <TableCell
              key={headCell.id}
              align={rowAlign}
              padding={
                headCell.disablePadding && withSelect ? "none" : "default"
              }
              sortDirection={orderBy === headCell.id ? order : false}
              className={s.table_head_title}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={
                  headCell.id !== "actions"
                    ? createSortHandler(headCell.id)
                    : undefined
                }
                hideSortIcon={headCell.id === "actions"}
                className={
                  headCell.id === "actions" ? s.disablePointer : undefined
                }
                IconComponent={ArrowUpIcon}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={s.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )})}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;