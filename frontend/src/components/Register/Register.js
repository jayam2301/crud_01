import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { addData } from "../Context/Context";

const Register = () => {
  const { udata, setUdata } = useContext(addData);
  const navigate = useNavigate();
  const [impval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, email, age, work, add, desc, mobile } = impval;
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        work,
        add,
        desc,
        mobile,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 422 || !data) {
      alert("Error");
      console.log("Error");
    } else {
      alert("Data added");
      setUdata(data);
      navigate("/");
    }
  };
  return (
    <>
      <div className="container">
        <NavLink to="/">home</NavLink>
        <form className="mt-4">
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={setdata}
                value={impval.name}
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={setdata}
                value={impval.email}
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                name="age"
                onChange={setdata}
                value={impval.age}
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                type="number"
                className="form-control"
                name="mobile"
                onChange={setdata}
                value={impval.mobile}
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="work" className="form-label">
                Work
              </label>
              <input
                type="text"
                className="form-control"
                name="work"
                onChange={setdata}
                value={impval.work}
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="add"
                onChange={setdata}
                value={impval.add}
              />
            </div>
            <div className="mb-3 col-lg-12 col-md-12 col-12">
              <label htmlFor="description" className="form-label">
                Descriptions
              </label>
              <textarea
                className="form-control"
                rows={3}
                cols={70}
                name="desc"
                onChange={setdata}
                value={impval.desc}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={addinpdata}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
