
import {
    Box,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Checkbox,
    IconButton,
    Tooltip,
    alpha,
    Paper,
    Button,
} from "@mui/material"
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useMemo, useState } from "react";
import _ from 'lodash';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, areaLabel="", columns, resources, attributes } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headerCellCheckbox = (_headCell) => {
    if(!_.isEmpty(resources) && !_.isEmpty(attributes)) {
      return resources?.every((x) => Object?.values(x)?.[0]?.[_headCell?.keyName] == true) && attributes?.every((x) => Object?.values(Object?.values(x)[0])?.every((y) => y?.[_headCell?.keyName] == true))
    } else if(!_.isEmpty(resources)) {
      return resources?.every((x) => Object?.values(x)?.[0]?.[_headCell?.keyName] == true)
    } else return false;
  }

  const headerCellIntermediateCheckbox = (_headCell) => {
    if(!_.isEmpty(resources) && !_.isEmpty(attributes)) {
      return resources?.some((x) => Object?.values(x)?.[0]?.[_headCell?.keyName] == true) && attributes?.some((x) => Object?.values(Object?.values(x)[0])?.some((y) => y?.[_headCell?.keyName] == true)) && !(resources?.every((x) => Object?.values(x)?.[0]?.[_headCell?.keyName] == true) && attributes?.every((x) => Object?.values(Object?.values(x)[0])?.every((y) => y?.[_headCell?.keyName] == true)))
    } else if(!_.isEmpty(resources)) {
      return resources?.some((x) => Object?.values(x)?.[0]?.[_headCell?.keyName] == true) && !resources?.every((x) => Object?.values(x)?.[0]?.[_headCell?.keyName] == true)
    } else return false;
  }

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': {areaLabel},
            }}
          />
        </TableCell> */}
        {columns.map((headCell, index) => (
          <>
            <TableCell
              key={`table-head-${headCell.id}-id-${index}-unique-${headCell.keyName}-uniqueId-${Math.floor(Math.random(112) * 10000)}`}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ w: headCell?.width ?? "80px" }}
            >
              {
                headCell?.headerCheckBox && (
                  <Checkbox
                    color="primary"
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    indeterminate={headerCellIntermediateCheckbox(headCell)}
                    checked={headerCellCheckbox(headCell)}
                    onChange={(e) => headCell?.handleChange(e, headCell)}
                    inputProps={{
                      'aria-label': {areaLabel},
                    }}
                  />
                ) 
              }
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          </>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, tableTitle="" } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            {/* <DeleteIcon /> */}
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            {/* <FilterListIcon /> */}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}


const TableComponent = ({
    columns=[],
    rows=[],
    additionalColumns=[],
    sorting='asc',
    columnOrderBy='id',
    areaLabel="dataTable",
    tableTitle="Data Table",
    rowClick=()=>{},
    data={},
}) => {
    const [order, setOrder] = useState(sorting);
    const [orderBy, setOrderBy] = useState(columnOrderBy);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [additionalRows, setAdditionalRows] = useState({});
    const [additionalRowsData, setAdditionalRowsData] = useState({});

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
        [...rows]
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, maxHeight: 400, overflowY: "scroll" }}>
                    <EnhancedTableToolbar numSelected={selected.length} tableTitle={tableTitle} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby={areaLabel}
                            size={'medium'}
                        >
                            <EnhancedTableHead
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={handleSelectAllClick}
                              onRequestSort={handleRequestSort}
                              rowCount={rows.length}
                              areaLabel={areaLabel}
                              columns={columns}
                              resources={data?.resources}
                              attributes={data?.attributes}
                            />
                            <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <>
                                      <TableRow
                                          hover
                                          role="checkbox"
                                          aria-checked={isItemSelected}
                                          tabIndex={-1}
                                          key={`table-row-${row.id}-id-${index}-unique-${labelId}-uniqueId-${Math.floor(Math.random(112) * 10000)}`}
                                          selected={isItemSelected}
                                          sx={{ cursor: 'pointer' }}
                                      >
                                          {/* <TableCell padding="checkbox">
                                            <Checkbox
                                              onClick={(event) => handleClick(event, row.id)}
                                              color="primary"
                                              checked={isItemSelected}
                                              inputProps={{
                                              'aria-labelledby': labelId,
                                              }}
                                            />
                                          </TableCell> */}
                                          {
                                            columns.map((col, _idx) => (
                                              <TableCell
                                                  key={`row-cell-${row.id}-unique-${labelId}-index-${col.keyName}-uniqueId-${Math.floor(Math.random(112) * 10000)}`}
                                                  component="th"
                                                  id={labelId}
                                                  scope="row"
                                                  padding="none"
                                                  sx={{ pl: 2 }}
                                              >
                                                  {
                                                      col?.isNested ? 
                                                      <>
                                                        <Box {...(_idx == 0 && rowClick ? { onClick: (e) => rowClick(e, row, col, additionalRows, setAdditionalRows, additionalRowsData, setAdditionalRowsData) } : {})}>
                                                          {col?.renderCell(data, row, col)} 
                                                        </Box>
                                                      </>
                                                      : 
                                                      col?.isExpandable ? 
                                                      <>
                                                        <Box {...(_idx == 0 && rowClick ? { onClick: (e) => rowClick(e, row, col, additionalRows, setAdditionalRows, additionalRowsData, setAdditionalRowsData) } : {})}>
                                                          {_idx != 0 && columns?.some((x) => x?.headerCheckBox) && <Checkbox
                                                              onClick={(event) => col?.onClick(event, row)}
                                                              color="primary"
                                                              checked={isItemSelected}
                                                              inputProps={{
                                                              'aria-labelledby': labelId,
                                                              }}
                                                          />}
                                                          {
                                                            (additionalRowsData?.[row?.id + "_exists"] || row?.expandable) ?
                                                              <Button variant="text" endIcon={additionalRows?.[row?.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
                                                                {row[col.keyName]}
                                                              </Button>
                                                            : 
                                                            <>
                                                              {row[col.keyName]}
                                                            </>
                                                          }
                                                        </Box>
                                                      </>
                                                      : 
                                                      <>
                                                        <Box>
                                                          {row[col.keyName]}
                                                        </Box>
                                                      </>
                                                  }
                                              </TableCell>
                                            ))
                                          }
                                      </TableRow>
                                      {additionalRows?.[row?.id] ? additionalRowsData?.[row?.id]?.map((_row) => (
                                          <TableRow
                                              hover
                                              role="checkbox"
                                              aria-checked={isItemSelected}
                                              tabIndex={-1}
                                              key={`table-${isItemSelected}-additional-row-${_row.id}-rendering-${_row[columns?.find((x) => x?.id == _row?.id)?.keyName]}-${columns?.find((x) => x?.id == _row?.id)?.keyName}-unique-${labelId}-uniqueId-${Math.floor(Math.random(112) * 10000)}`}
                                              selected={isItemSelected}
                                              sx={{ cursor: 'pointer' }}
                                          >
                                              {/* <TableCell padding="checkbox">
                                                  <Checkbox
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                    'aria-labelledby': labelId,
                                                    }}
                                                />
                                              </TableCell> */}
                                              {
                                                additionalColumns?.map((_col) => (
                                                  <TableCell
                                                      key={`row-cell-${_row.id}-data-${_row.id}-unique-${labelId}-index-${_col.keyName}-uniqueId-${Math.floor(Math.random(112) * 10000)}`}
                                                      component="th"
                                                      id={labelId}
                                                      scope="row"
                                                      padding="none"
                                                      sx={{ pl: 2 }}
                                                  >
                                                    {_col?.isNested ? _col?.renderCell(data, _row, _col, row) : _row[_col.keyName]}
                                                  </TableCell>
                                                ))
                                              }
                                          </TableRow>
                                      )) : ""}
                                    </>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                  style={{
                                      height: 53 * emptyRows,
                                  }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </>
    )
}

export default TableComponent;