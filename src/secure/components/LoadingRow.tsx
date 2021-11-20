import React from "react";

function LoadingRow(props: any) {
    return (
        <tr>
            <td colSpan={props.colSpan ?? 1}>
                <div className="d-flex align-items-center my-2">
                    <div className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></div>
                    <strong>Loading...</strong>
                </div>
            </td>
        </tr>
    );
}

export default LoadingRow;