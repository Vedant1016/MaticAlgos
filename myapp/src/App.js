import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { returnsData } from "./Panel/returns.js";
import TradingChart from "../src/Panel/Chart.js";
import InformationTable from "../src/Panel/InformationTable.js";
import { BsBorder, BsFillInfoCircleFill } from "react-icons/bs";

const App = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        backgroundColor: "#EEEEEE",
        padding: 2,
      }}
    >
      <Card variant="outlined" sx={{borderRadius:'20px'}}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            top: "8%",
            left: "4%",
            borderRadius:'5px'
          }}
        >
          <b>Drawdown Periods</b>
          <button
            style={{
              marginTop: "1%",
              marginLeft: "3px", // Add margin to the left of the button
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <BsFillInfoCircleFill />
          </button>
        </div>

        <CardContent sx={{ marginTop: "7%" }}>
          <TradingChart data={returnsData.data.combined} />
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275, flex: 1, borderRadius:"20px" }} variant="outlined">
        <CardContent>
          <InformationTable />
        </CardContent>
      </Card>
    </Box>
  );
};

export default App;
