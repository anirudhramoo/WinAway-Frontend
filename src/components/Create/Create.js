import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUser, logout } from "../../redux/user";
import { getCheckCreated } from "../../redux/checkCreated";
import "./Create.css";
import axios from "axios";
import Form from "./Form/Form";
import validate from "./Validate";
import { setShow } from "../../redux/showSearch";
import CircularProgress from "@material-ui/core/CircularProgress";

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.user);
  if (!userData) history.push("/auth");
  const checkCreated = useSelector((state) => state.checkCreated);
  if (checkCreated != false) history.push(`/giveaway/${checkCreated}`);
  const [created, setCreated] = useState(false);
  const standard = {
    title: "",
    value: "",
    prize: "",
    contact: "",
    image: "",
    expiryDate: "",
    enter: "",
  };

  useEffect(() => {
    if (!userData) history.push("/auth");
    dispatch(getCheckCreated());
  }, []);
  let checkError = standard;
  const [error, setError] = useState(standard);
  const [input, setInput] = useState({
    title: "",
    channel: {
      name: userData?.channel?.snippet?.title,
      subscribers: userData?.channel?.statistics?.subscriberCount,
      channelId: userData?.channel?.id,
    },
    prize: "",
    enter: [{ requirements: [""], draw: 1 }],
    expiryDate: new Date(),
    contact: "",
    value: 0,
    creator: userData?.user?.googleId,
    image: "",
  });
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

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

      setCreated(true);
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
      let res = await axios.post(
        process.env.REACT_APP_apiUrl + "/giveaways",
        formData,
        options
      );
      let id = res.data._id;
      setCreated(false);
      history.push(`/giveaway/${id}`);
    } catch (err) {
      if (err.response.request.status != 400) {
        alert("There was an error, please sign back in");
        dispatch(logout());
      }
      console.log(err.response);
    }
  };
  const handleDateChange = (date) => {
    setInput((prev) => {
      return { ...prev, expiryDate: date };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
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
      className="outer-create"
      onClick={() => {
        dispatch(setShow(false));
      }}
    >
      {!created ? (
        <div className="create_div">
          <h1 className="create__heading gradient">
            Please Fill in the details to Create a Giveaway
          </h1>
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

export default Create;

/*
You hve a form. Upon submit, you will run a function that validates all the input boxes. 
If there are any errors, you will update the state of the errors and return immediately. Else,
you will update a state that says temSuccess and play an animation. Then, you post that data to your backend, get the id of your 
post and redirect there. right before you redirect, turn tempSuccess off.



Also set up a useEffect that checks if the user already has a giveaway using an axios request. If so, redirect there.
*/
