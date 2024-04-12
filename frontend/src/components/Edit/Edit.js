import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { updateData } from "../Context/Context";

const Edit = () => {
  const navigate = useNavigate();

  const { updata, setUpdata } = useContext(updateData);

  const [impval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);
  const { id } = useParams("");
  console.log(id);
  const getuser = async () => {
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
      setINP(data);
      console.log("get data");
    }
  };
  useEffect(() => {
    getuser();
  }, []);
  const updateuser = async (e) => {
    e.preventDefault();
    const { name, email, age, work, add, mobile, desc } = impval;
    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, age, work, add, mobile, desc }),
    });
    const data2 = await res2.json();
    console.log(data2);
    if (res2.status === 422 || !data2) {
      alert("Fill the data properly");
    } else {
      alert("Data added");
      setUpdata(data2);
      navigate("/");
    }
  };

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
  return (
    <div className="container">
      <NavLink to="/">home2</NavLink>
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
              name="address"
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
            onClick={updateuser}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
