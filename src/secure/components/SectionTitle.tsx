import React from "react";

const SectionTitle = (props: any) => (
    <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-4 border-bottom">
        <h1 className="h4 fw-bold">{props.title}</h1>
        {(props.isLoading ?? false) && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
    </div>
);

export default SectionTitle;