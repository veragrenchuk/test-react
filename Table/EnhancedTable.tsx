import { FC, useState, useEffect, useRef, MouseEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ModalWindow from "../ModalWindow";
import MenuItemsWindow from "../MenuItemsWindow";  
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

import { Table, TableCell, TableBody, TableContainer, TableRow } from '@material-ui/core';
import StyledMaterialCheckbox from "../../../controls/MaterialCheckBox";
import { useStyles } from "../../../styles/components/Table/enhancedTable.styles";
import SkeletonLoader from "../SkeletonLoader";

type Order = 'asc' | 'desc';

const EnhancedTable: FC<any> = (props) => {
  const { data, pagingAction, defaultOrderName, tableProps,
    modalProps, menuModal, modalActions, selectedItem, isLoading,
    paginationProps } = props;
  const s = useStyles({
    isLoading
  });
  const dispatch = useDispatch();
  const isFirstRender = useRef(false);
  const { id } = useParams<{ id?: string }>();

  const [orderBy, setOrderBy] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);

  const [activeColumn, setActiveColumn] = useState<string>("");
  const [order, setOrder] = useState<Order>('asc');

  useEffect(() => {
    paginationProps?.setCurrentPage(1)
  }, [setOrder, order]);

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(
        pagingAction({
          per_page: paginationProps?.rowsPerPage,
          page: paginationProps?.currentPage,
          sort: activeColumn.length ? activeColumn : defaultOrderName,
          direction: order,
          id
        })
      );
    } else {
      isFirstRender.current = true;
    }
  }, [paginationProps?.currentPage, paginationProps?.rowsPerPage, activeColumn, order]);

  const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setActiveColumn(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n: any) => n);
      setSelected(newSelecteds);
      return;
    }
    localStorage.removeItem("isSelectedAssets");
    setSelected([]);
  };

  const handleClick = (event: any, item: any) => {
    const selectedIndex = selected.indexOf(item);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const isSelected = (user: any) => selected.indexOf(user) !== -1;

  useEffect(() => {
    localStorage.setItem("isSelectedAssets", selected?.length ? "1" : "0");

    return (() => {
      localStorage.removeItem("isSelectedAssets");
    });
  }, [selected]);

  return (
    <div className={s.root}>
      {tableProps.rows?.length ? (
        <TableContainer className={s.table_container}>
          <Table className={s.table} stickyHeader>
            <EnhancedTableHead
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableProps?.rows?.length}
              headCells={tableProps?.headCells}
              withSelect={tableProps?.withSelect}
            />
            <TableBody>
              {tableProps?.rows.map((row: any, index: number) => {
                const isItemSelected = isSelected(data[index]);
                const labelId = `enhanced-table-checkbox-${data[index]?.id}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={data[index]?.id}
                    selected={isItemSelected}
                  >
                    {tableProps?.withSelect && (
                      <TableCell padding="checkbox">
                        <StyledMaterialCheckbox
                          onClick={event => handleClick(event, data[index])}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                    )}
                    {tableProps?.keysOfTable?.map(
                      (keyTable: string, index: number) => {
                        return (
                          <TableCell
                            className={s.default__table_cell}
                            key={`${keyTable}${index}`}
                            align="left"
                            component={index === 0 ? "th" : undefined}
                            scope={index === 0 ? "row" : undefined}
                            padding={
                              index === 0 && tableProps?.withSelect
                                ? "none"
                                : undefined
                            }
                          >
                            {isLoading ? <SkeletonLoader /> : row[keyTable]}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className={s.no_data__wrapper}>No data available</div>
      )}
      <ModalWindow
        show={modalProps?.show}
        handleClose={modalProps?.handleClose}
        modalTitle={modalProps?.titleModal}
        modalTextBody={modalProps?.textContentModal}
        btnActionTitle={modalProps?.textBtnActionModal}
        onAction={modalActions?.onDelete}
      />
      <MenuItemsWindow
        anchorMenu={menuModal?.anchorMenu}
        openMenu={menuModal?.openMenu}
        closeMenu={menuModal?.closeMenu}
        currentItem={selectedItem?.currentItem}
        onDetails={modalActions?.onDetails}
        onRemove={modalProps?.onModal}
        onEdit={modalActions?.onEdit}
        menuList={
          selected.length > 0
            ? menuModal?.menuHeaderCardList
            : menuModal?.menuList
        }
      />
    </div>
  );
};

export default EnhancedTable;