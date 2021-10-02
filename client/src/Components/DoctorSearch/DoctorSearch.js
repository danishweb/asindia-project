import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import doctor from "../../doctor.json";
import Pagination from "./Pagination";

const DoctorSearch = (props) => {
  const history = useHistory();
  const callDoctorSearch = async () => {
    try {
      const res = await fetch("/doctor", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callDoctorSearch();
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const searchText = (e) => {
    setSearch(e.target.value);
  };
  const searchTerm = doctor.filter((val) => {
    if (
      val.doctor.toLowerCase().includes(search.toLowerCase()) ||
      val.speciality.toLowerCase().includes(search.toLowerCase())
    ) {
      return val;
    } else {
      return null;
    }
  });
  return (
    <>
      <h2 className="form-title text-center mb-5">Welcome</h2>
      <div className="searchbar">
        <form method="GET">
          <div className="mb-3 mx-5 ">
            <h5 className="form-title text-center mb-3">Find your Doctor</h5>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={search}
              onChange={searchText}
              placeholder="Name or Speciality"
              className="form-control "
            />
          </div>
        </form>
      </div>
      <Pagination setPage={setPage} page={page} searchTerm={searchTerm} />
      <div className="row mx-5">
        {searchTerm.slice((page - 1) * 18, page * 18).map((item) => {
          return (
            <div
              className="col-sm-12 col-md-4 col-lg-2 col-xl-2 my-2 doctor-card"
              key={item.id}
            >
              <div
                class="card text-center"
                style={{ minWidth: "2rem", height: "10rem" }}
              >
                <div class="card-body">
                  <h5 class="card-title ">{item.doctor}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    {item.speciality}
                  </h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination setPage={setPage} page={page} searchTerm={searchTerm} />
    </>
  );
};

export default DoctorSearch;
