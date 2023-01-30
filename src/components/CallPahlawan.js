import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

function CallPahlawan() {
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const baseURL = "https://indonesia-public-static-api.vercel.app/api/heroes";
    const [rows, setRows] = useState("");
    const [rowdata, setRowdata] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setRows(response.data);
      console.log(response.data);
    });
  }, []);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (rowdata) {
      setRows([rowdata]);
    } else {
      axios.get(baseURL).then((response) => {
        setRows(response.data);
        console.log(response.data);
      });
    }
  }, [rowdata]);


  return (
    <>
      <h1> Nama Pahlawan indonesia </h1>
      <header>Untuk memenuhi Tugas Besar Mata Kuliah Front End Programming</header>
      {rows ? (
        <Card sx={{ minWidth: 900, m: 8 }} elevation={11}>
          <Box
            component="span"
            m={1}
            pr={1}
            pt={4}
            display="flex"
            justifyContent="end"
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              onChange={(e, v) => setRowdata(v)}
              sx={{ width: 700 }}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} label="Cari Pahlawan" size="small" />
              )}
            />
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                  <TableCell align="start">No</TableCell>
                    <TableCell align="start">Nama</TableCell>
                    <TableCell align="center">Tahun Lahir</TableCell>
                    <TableCell align="center">Tahun Wafat</TableCell>
                    <TableCell align="center">Tahun Kenaikan</TableCell>
                    <TableCell align="start">Deskripsi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          <TableCell align="start">{index + 1}</TableCell>
                          <TableCell align="start">{row.name}</TableCell>
                          <TableCell align="center">{row.birth_year}</TableCell>
                          <TableCell align="center">{row.death_year}</TableCell>
                          <TableCell align="center">{row.ascension_year}</TableCell>
                          <TableCell align="start">{row.description}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Card>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}


export default CallPahlawan;