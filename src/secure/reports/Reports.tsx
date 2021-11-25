import React from "react";
import {Route, Routes} from "react-router-dom";
import ReportIndex from "./ReportIndex";
import ReportCurrentMonth from "./ReportCurrentMonth";
import ReportLastQuarter from "./ReportLastQuarter";

function Reports() {
    return (
        <Routes>
            <Route path={'/'} element={<ReportIndex/>} />
            <Route path={'current-month'} element={<ReportCurrentMonth/>} />
            <Route path={'last-quarter'} element={<ReportLastQuarter/>} />
        </Routes>
    );
}

export default Reports;