import React, { useEffect, useState } from "react";
import "./Edit.css";
import Form from "../Create/Form/Form";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import validate from "../Create/Validate";
import axios from "axios";
import { logout } from "../../redux/user";
import { setShow } from "../../redux/showSearch";
import CircularProgress from "@material-ui/core/CircularProgress";

const Edit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const standard = {
    title: "",
    value: "",
    prize: "",
    contact: "",
    image: "",
    expiryDate: "",
    enter: "",
  };
  const [input, setInput] = useState(standard);
  const [error, setError] = useState(standard);
  const giveaway = useSelector((state) => state.editGiveaway);
  const [image, setImage] = useState(giveaway.image);
  const [edited, setEdited] = useState(false);
  const userData = useSelector((state) => state.user);
  useEffect(() => {
    if (giveaway == false) history.push("/");
    setInput(giveaway);
  }, [giveaway]);
  let checkError = standard;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      checkError = standard;

      validate(checkError, input);

      if (
        checkError.title ||
        checkError.value ||
        checkError.prize ||
        checkError.contact ||
        checkError.image ||
        checkError.expiryDate ||
        checkError.enter
      ) {
        setError(checkError);
        return;
      }
      setEdited(true);
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("channel", JSON.stringify(input.channel));
      formData.append("prize", input.prize);
      formData.append(
        "enter",
        JSON.stringify({ requirements: ["test", "requirement"], draw: 1 })
      );
      input.enter.forEach((enter) => {
        formData.append("enter", JSON.stringify(enter));
      });
      formData.append("expiryDate", input.expiryDate);
      formData.append("contact", input.contact);
      formData.append("value", input.value);
      formData.append("image", input.image);

      const options = {
        headers: {
          authorization: `Bearer ${userData?.token}`,
        },
      };
      let res = await axios.patch(
        process.env.REACT_APP_apiUrl + `/giveaways/${giveaway._id}`,
        formData,
        options
      );
      setEdited(false);
      history.push(`/giveaway/${giveaway._id}`);
    } catch (err) {
      if (err.response.status === 401 || err.response.status == 403) {
        alert("There was an error, please sign back in");
        dispatch(logout());
      }
      console.log(err.response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleDateChange = (date) => {
    setInput((prev) => {
      return { ...prev, expiryDate: date };
    });
  };

  const handlePhoto = (e) => {
    setInput((prev) => {
      return { ...prev, image: e.target.files[0] };
    });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div
      className="edit__div"
      onClick={() => {
        dispatch(setShow(false));
      }}
    >
      {!edited ? (
        <div className="inner_edit_div">
          <h1 className="edit__heading gradient">Please edit your giveaway</h1>
          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handlePhoto={handlePhoto}
            input={input}
            setInput={setInput}
            image={image}
            setImage={setImage}
            error={error}
            edit={true}
          />
        </div>
      ) : (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Edit;
