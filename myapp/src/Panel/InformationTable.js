import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { ddPeriods } from "./ddperiod";

const InformationTable = () => {
  return (
    <div style={{ maxHeight: "auto", overflowY: "auto", borderLeft: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
      <TableContainer component={Paper} style={{ borderBottom: "1px solid #ddd" }}>
        <Table style={{ borderRadius: "4px" }}>
          <TableHead style={{ backgroundColor: "lightgrey" }}>
            <TableRow>
              <TableCell
                style={{ borderRight: "1px solid #ddd", textAlign: "center" }}
              >
                <b>Period</b>
              </TableCell>
              <TableCell
                align="right"
                style={{ borderRight: "1px solid #ddd", textAlign: "center" }}
              >
                <b>MaxDD</b>
              </TableCell>
              <TableCell align="right" style={{ textAlign: "center", borderRight: "1px solid #ddd" }}>
                <b>Days</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ddPeriods.data.map((period, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ borderRight: "1px solid #ddd", textAlign: "center" }}
                >
                  {`${period.Start_Date} - ${period.End_Date}`}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid #ddd",
                    color: "#f36361",
                    textAlign: "center",
                  }}
                  align="right"
                >
                  {(Math.round(period.Max_Drawdown * 100) / 100).toFixed(2)}
                </TableCell>
                <TableCell align="right" style={{ textAlign: "center" }}>
                  {period.Drawdown_days}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InformationTable;
