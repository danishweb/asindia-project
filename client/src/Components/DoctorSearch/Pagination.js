import React from "react";

const Pagination = (props) => {
  const changePage = (e, max) => {
    const newPage = props.page + e;
    if (newPage > 0 && newPage < max + 1) {
      props.setPage(newPage);
    }
  };

  return (
    <div className=" my-4 text-center d-flex align-items-center justify-content-center">
      <div
        onClick={() => changePage(-1, Math.ceil(props.searchTerm.length / 20))}
        className="btn btn-outline-primary float-start "
        F
      >
        Previous
      </div>

      <h6 className="btn ">
        Page {props.page} of {Math.ceil(props.searchTerm.length / 20)}
      </h6>

      <div
        onClick={() => changePage(1, Math.ceil(props.searchTerm.length / 20))}
        className="btn btn-outline-primary  float-end"
      >
        Next
      </div>
    </div>
  );
};

export default Pagination;
