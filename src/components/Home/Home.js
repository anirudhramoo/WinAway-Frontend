import React, { useEffect } from "react";
import "./Home.css";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { setShow } from "../../redux/showSearch";

const Home = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      onClick={() => {
        dispatch(setShow(false));
      }}
      className="home__outer"
    >
      <div className="home">
        <h1 className="title">Welcome</h1>
        <h1 className="title">to</h1>
        <h1 className="title">WinAway !</h1>
        <p className="subtitle">The #1 platform for YouTube giveaways</p>
      </div>

      <div className="message">
        <i className="fab fa-youtube icon gradient"></i>
        <h3 className="info-title">
          Made for YouTube enthusiasts, by YouTube enthusiasts ...
        </h3>
        <p className="info">
          Have you ever wanted to keep up-to-date on the latest YouTube
          giveaways. Well look no further. WinAway is a platform where content
          creators on YouTube can sign up and advertise their giveaways. This
          leads to us being able to match viewers with the best giveaways
          available. After all, the more giveaways you enter, the more you win.
          And we provide you all the giveaways you would ever need. So what are
          you waiting for? Get Started with the button below.
        </p>

        <Button
          onClick={() => {
            history.push("/giveaways");
          }}
          className="but"
          variant="outlined"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Home;
