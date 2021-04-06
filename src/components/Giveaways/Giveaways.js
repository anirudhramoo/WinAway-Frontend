import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGiveaway } from "../../redux/giveaways";
import "./Giveaways.css";
import Card from "./Card";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setShow } from "../../redux/showSearch";
import { setSearchResults } from "../../redux/searchResults";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Giveaways = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const searched = useSelector((state) => state.displaySearch);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!searched) dispatch(getGiveaway());
    dispatch(setSearchResults(false));
  }, [location]);
  const giveaways = useSelector((state) => state.giveaway);

  return (
    <div
      className="giveaways"
      onClick={() => {
        dispatch(setShow(false));
      }}
    >
      {giveaways.length == 0 && (
        <div className="giveaways__popular">
          <h1 className="giveaways__title">
            There doesnt seem to be anything here that fits your search.
          </h1>

          <h3 className="giveaways__others2">Please use another Search</h3>
          <Button
            onClick={() => {
              history.push("/giveaways");
            }}
            className="nothing__button"
            variant="outlined"
            size="large"
          >
            Go Back
          </Button>
        </div>
      )}
      {!(giveaways.length == 1 && giveaways[0] == "in-progress") ? (
        <>
          {giveaways.length > 0 && (
            <div className="giveaways__popular">
              <h1 className="giveaways__title">The Best giveaways for you.</h1>
              <Grid container spacing={2}>
                {giveaways.map((giveaway, index) => {
                  if (index < 3)
                    return (
                      <Grid item xs={12} sm={6} md={4} key={giveaway._id}>
                        <Card giveaway_data={giveaway} />
                      </Grid>
                    );
                })}
              </Grid>
            </div>
          )}
          {giveaways.length > 3 && (
            <div className="giveaways__secondary">
              <Grid container spacing={1}>
                {giveaways.map((giveaway, index) => {
                  if (index > 2 && index < 6)
                    return (
                      <Grid item xs={12} sm={6} md={4} key={giveaway._id}>
                        <Card giveaway_data={giveaway} />
                      </Grid>
                    );
                })}
              </Grid>
            </div>
          )}
          {giveaways.length > 5 && (
            <div className="giveaways__others">
              <h1 className="gradient">Others you may be interested in</h1>
              <Grid container spacing={1}>
                {giveaways.map((giveaway, index) => {
                  if (index > 5)
                    return (
                      <Grid item xs={6} sm={4} md={3} lg={2} key={giveaway._id}>
                        <Card giveaway_data={giveaway} smaller="true" />
                      </Grid>
                    );
                })}
              </Grid>
            </div>
          )}
        </>
      ) : (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Giveaways;
