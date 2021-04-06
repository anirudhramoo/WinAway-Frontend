import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getIndividual } from "../../redux/individual";
import { setEdit } from "../../redux/editGiveaway";
import { setShow } from "../../redux/showSearch";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import "./Giveaway.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import addComma from "../../helper/addComma";

const Giveaway = () => {
  let id = useParams().id;
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIndividual(id));
    window.scrollTo(0, 0);
  }, [location]);
  const giveaway = useSelector((state) => state.individual);
  const userData = useSelector((state) => state.user);

  const [del, setDel] = useState(false);

  const handleDelete = async () => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${userData.token}`,
        },
        data: "test",
      };
      await axios.delete(
        process.env.REACT_APP_apiUrl + `/giveaways/${id}`,
        options
      );
      history.push("/giveaways");
    } catch (err) {
      console.log(err);
    }
  };
  const checkDelete = () => {
    setDel(true);
  };
  const reverseDelete = () => {
    setDel(false);
  };
  const handleEdit = () => {
    dispatch(setEdit(giveaway));
    history.push("/edit");
  };
  return (
    <div
      onClick={() => {
        dispatch(setShow(false));
      }}
      className="individual__outer__div"
    >
      {giveaway?._id !== id ? (
        <div className="loading" style={{ marginBottom: "-50px" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="individual_giveaway_titlediv">
            <h1 className="individual_giveaway_title">{giveaway?.title}</h1>
            <h2 className="individual_giveaway_name">
              {giveaway?.channel?.name}
            </h2>
            {giveaway.image && (
              <img
                src={
                  giveaway.image.slice(0, 6) === "images"
                    ? process.env.REACT_APP_apiUrl + `/${giveaway.image}`
                    : giveaway.image
                }
                className="individual_giveaway_image"
              />
            )}
            <h1 className="individual_giveaway_prize">What can you win ?</h1>
            <h4 className="individual_giveaway_prizedetails">
              {giveaway.prize}
            </h4>

            <h1 className="individual_giveaway_prize">
              Overall value of Giveaway.
            </h1>
            <h4 className="individual_giveaway_prizevalue">
              $ {addComma(giveaway.value)}
            </h4>
          </div>
          <div className="individual_giveaway_seconddiv">
            <h1 className="individual__enter__heading gradient">
              Ways you can enter
            </h1>
            {giveaway.enter &&
              giveaway.enter.map((enter, index) => {
                return (
                  <div key={enter._id} className="individual__giveaway__enter">
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <div>
                          <h3 className="individual__requirement__header">
                            Requirements
                          </h3>
                          {giveaway.enter[index].requirements.map(
                            (requirement, index) => {
                              return (
                                <h4
                                  key={index}
                                  className="individual__specific__requirement"
                                >
                                  {requirement}
                                </h4>
                              );
                            }
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <h3 className="individual__slots__header">
                            Number of slots awarded
                          </h3>
                          <h3 className="individual__specific__requirement">
                            {giveaway.enter[index].draw}
                          </h3>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div className="individual__griditem__div">
                  <h1 className="individual__griditem__title gradient">
                    Giveaway end date
                  </h1>
                  <h4 className="individual__date">
                    {moment(giveaway?.expiryDate).format("LLLL")}
                  </h4>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="individual__griditem__div second">
                  <h1 className="individual__griditem__title gradient">
                    How the winner/s will be contacted
                  </h1>
                  <h4 className="individual__date">{giveaway?.contact}</h4>
                </div>
              </Grid>
            </Grid>

            {userData &&
              giveaway.creator &&
              userData.user.googleId === giveaway.creator && (
                <>
                  {del && (
                    <h1 className="individual_guaranteeDelete">
                      Are you Sure?
                    </h1>
                  )}
                  <div className="individual_buttons">
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      size="large"
                      onClick={del ? handleDelete : checkDelete}
                    >
                      {del ? "Yes" : "Delete"}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={del ? null : <EditIcon />}
                      size="large"
                      onClick={del ? reverseDelete : handleEdit}
                    >
                      {del ? "No, go back" : "Edit"}
                    </Button>
                  </div>
                </>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default Giveaway;
