import {Route, Routes} from "react-router-dom";
import React from "react";
import ProductIndex from "./ProductIndex";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";

function Products() {
    return (
        <Routes>
            <Route path={'/'} element={<ProductIndex/>} />
            <Route path={'create'} element={<ProductCreate/>} />
            <Route path={':id/edit'} element={<ProductEdit/>} />
        </Routes>
    );
}

export default Products;