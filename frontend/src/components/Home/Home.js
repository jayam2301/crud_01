import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";
import { addData, updateData, deleteData } from "../Context/Context";

const Home = () => {
  const { updata, setUpdata } = useContext(updateData);
  const { dData, setDdata } = useContext(deleteData);
  const { udata, setUdata } = useContext(addData);
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);
  const getdata = async () => {
    const response = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 422 || !data) {
      console.log("Error");
    } else {
      setUserdata(data);
      console.log("get data");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const response2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await response2.json();
    console.log(deletedata);

    if (response2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("User deleted successfully");
      setDdata(deleteData);
      getdata();
    }
  };

  return (
    <>
      {udata ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            style={{ textAlign: "center" }}
            role="alert"
          >
            <strong>{udata.name}</strong> added successfully.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            />
          </div>
        </>
      ) : (
        ""
      )}
      {updata ? (
        <>
          <div
            className="alert alert-warning alert-dismissible fade show"
            style={{ textAlign: "center" }}
            role="alert"
          >
            <strong>{updata.name}</strong> updated successfully.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            />
          </div>
        </>
      ) : (
        ""
      )}
      {dData ? (
        <>
          <div
            className="alert alert-danger alert-dismissible fade show"
            style={{ textAlign: "center" }}
            role="alert"
          >
            <strong>{dData.name}</strong> deleted successfully.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            />
          </div>
        </>
      ) : (
        ""
      )}
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2">
            <NavLink className="btn btn-secondary" to="/register">
              Add data
            </NavLink>
          </div>
          <table className="table mt-3">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.work}</td>
                      <td>{element.mobile}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element._id}`}>
                          <button className="btn btn-success">
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${element._id}`}>
                          {" "}
                          <button className="btn btn-primary">
                            <EditIcon />
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(element._id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
