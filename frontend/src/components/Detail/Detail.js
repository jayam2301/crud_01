import React, { useContext, useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import profile from "../../image/profile.png";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);
  const { id } = useParams("");
  console.log(id);
  const getdata = async () => {
    const response = await fetch(`/getuser/${id}`, {
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
      navigate("/");
    }
  };
  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: "400" }}>Welcome</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getuserdata._id}`}>
              {" "}
              <button className="btn btn-primary mx-2">
                <EditIcon />
              </button>
            </NavLink>

            <button
              className="btn btn-danger"
              onClick={() => deleteuser(getuserdata._id)}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src={profile} alt="" style={{ width: "50px" }} />

              <h3 className="mt-3">
                Name : <span>{getuserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{getuserdata.age}</span>
              </h3>
              <h3 className="mt-3">
                <EmailIcon />
                Email :<span>{getuserdata.email}</span>
              </h3>
              <h3 className="mt-3">
                <WorkIcon />
                Occupation : <span>{getuserdata.work}</span>
              </h3>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
              <h3 className="mt-5">
                <SmartphoneIcon />
                Mobile : <span>+91 {getuserdata.mobile}</span>
              </h3>
              <h3 className="mt-3">
                <LocationOnIcon />
                Location :<span>{getuserdata.add}</span>
              </h3>
              <h3 className="mt-3">
                Description :<span>{getuserdata.desc}</span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
