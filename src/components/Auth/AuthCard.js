import React from "react";
import "./AuthCard.css";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/user";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AuthCard = (props) => {
  const history = useHistory();
  const { channel, user, token } = props;
  const dispatch = useDispatch();
  const handleClick = async () => {
    localStorage.setItem("userData", JSON.stringify({ user, channel, token }));
    dispatch(getUser());
    const channelId = channel.id;
    const name = channel.snippet.title;
    const subscribers = channel.statistics.subscriberCount;
    let URL = process.env.REACT_APP_apiUrl + "/auth/google";
    await axios.post(URL, { channelId, name, subscribers });
    history.push("/create");
  };

  return (
    <div className="auth__card" onClick={handleClick}>
      <h3>{channel.snippet.title}</h3>
      <h5>{`${
        channel.statistics.hiddenSubscriberCount
          ? "Please don't hide your subscriber number"
          : "Subscribers: " + channel.statistics.subscriberCount
      }`}</h5>
      <Avatar
        src={
          channel?.snippet?.thumbnails?.high?.url ||
          channel?.snippet?.thumbnails?.medium?.url ||
          channel?.snippet?.thumbnails?.default?.url ||
          user?.imageUrl
        }
      />
    </div>
  );
};

export default AuthCard;
