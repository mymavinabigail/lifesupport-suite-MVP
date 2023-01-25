import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { onSave } from "../reducer/person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const Form = () => {
  const [data, setData] = useState([]);
  const [error, seterror] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeText = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onlyNumberKey = (evt) => {
    const { name, value } = evt.target;
    if (value.match(/^[0-9]+$/) != null) {
      setData({
        ...data,
        [name]: value,
      });
    }
    if (value == "") {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  return (
    <div className="text-center main-bg">
      <div className="form-sec">
        <div className="form-inner">
      <Title title={"Customer Information"} />
      <div className="m-4">
        <TextField
          className="full-w"
          id="outlined-basic"
          label="Client Id"
          variant="outlined"
          onChange={changeText}
          name="id"
        />
      </div>
      <div className="m-4">

        <TextField
          className="full-w"
          id="outlined-basic"
          label="Client Age"
          variant="outlined"
          onChange={onlyNumberKey}
          name="age"
          type="numeric"
          value={data.age == undefined ? "" : data.age}
        />
        <div className="form-error"> {error}</div>


      </div>
      <div className="m-4">
        <TextField
          type={"date"}
          className="full-w"
          id="outlined-basic"
          // label="Meeting Date"
          variant="outlined"
          onChange={changeText}
          name="date"
        />
      </div>
      <Button className="submit-btn"
        onClick={() => {
          if (parseInt(data.age) >= 18 && parseInt(data.age) <= 100) {
            dispatch(onSave(data));
            navigate("/first");
          } else {
            seterror("Invalid age!(only 18 - 100)");
            setTimeout(() => {
              seterror(null);
            }, 4000);
          }
        }}
        variant="contained"
      >
        COMMENCE ACTIVITY
      </Button>
      </div>
      </div>
    </div>
  );
};

export default Form;
