import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import AuthCard from "./AuthCard";
import "./Auth.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShow } from "../../redux/showSearch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const Auth = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) history.push("/giveaways");
  }, []);

  const success = async (res) => {
    try {
      setLoading(true);
      setUser(res?.profileObj);

      let URL = process.env.REACT_APP_apiUrl + "/auth/token";
      let token = await axios.post(URL, { token: res?.tokenId });
      token = token.data.token;

      setToken(token);
      const options = {
        headers: {
          Authorization: `Bearer ${res.tokenObj.access_token}`,
        },
      };

      const result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=statistics,snippet&mine=true&key=${process.env.REACT_APP_Google_Key}`,
        options
      );
      setChannels(result.data.items);
      if (!result.data.items) {
        setChannels([{ statistics: { subscriberCount: -5 } }]);
      }
      setLoading(false);
    } catch (err) {
      console.log(err.response);
    }
  };
  const failure = (googleData) => {
    alert("There was an error with the sign in. Please try again later.");
    console.log(googleData);
  };
  const paddingbottom = { paddingBottom: `${!channels ? "280px" : "150px"}` };
  return (
    <div
      className="auth__div"
      style={paddingbottom}
      onClick={() => {
        dispatch(setShow(false));
      }}
    >
      <div>
        {!channels ? (
          <>
            {!loading ? (
              <>
                <h1 className="initial__auth__header">
                  Before you can make a giveaway, please sign in with the Gmail
                  Account that owns your channel.
                </h1>

                <GoogleLogin
                  clientId={process.env.REACT_APP_Google_Client_Id}
                  buttonText="Log in with Google"
                  onSuccess={success}
                  onFailure={failure}
                  cookiePolicy={"single_host_origin"}
                  scope="https://www.googleapis.com/auth/youtube.readonly"
                />
                <div>
                  <Button
                    variant="outlined"
                    className="policyButton"
                    onClick={() => {
                      history.push("/policy");
                    }}
                  >
                    View our privacy policy
                  </Button>
                </div>
              </>
            ) : (
              <CircularProgress />
            )}
          </>
        ) : (
          <div className="channels__div">
            <h1>
              Please choose the Channel you want to use. Note: you must have
              over 1000 subscribers.
            </h1>
            {channels.map((channel) => {
              if (channel.statistics.subscriberCount > 0)
                return (
                  <AuthCard
                    channel={channel}
                    user={user}
                    token={token}
                    key={channel.id}
                  />
                );
            })}

            <h4 className="reason_title">
              You may not see your channel for 2 reasons.
            </h4>
            <h4 className="reason">
              1. Your channel/s dont have the required number of subscribers
            </h4>
            <h4 className="reason">2. You dont own a YouTube Channel</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
