import React from "react";

const SectionTitleAction = (props: any) => {
    return (
        <div
            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h3 fw-bold">{props.title}</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                {props.children}
            </div>
        </div>
    );
}

export default SectionTitleAction;