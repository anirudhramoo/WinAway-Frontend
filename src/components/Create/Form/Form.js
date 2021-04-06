import React from "react";
import { useHistory } from "react-router-dom";
import Requirements from "./Requirements";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import "./Form.css";
import Button from "@material-ui/core/Button";
import { setEdit } from "../../../redux/editGiveaway";

const Form = ({
  handleSubmit,
  input,
  handleChange,
  handleDateChange,
  handlePhoto,
  image,
  setImage,
  setInput,
  error,
  edit,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <div className="form-input" style={{ marginTop: "20px" }}>
              {error.title ? (
                <label className="form__label error">{error.title}</label>
              ) : (
                <label className="form__label">Giveaway Title *</label>
              )}
              <input
                autoComplete="off"
                className="form__input"
                name="title"
                value={input.title}
                onChange={handleChange}
              ></input>
            </div>

            <div className="form-input">
              {error.prize ? (
                <label className="form__label error">{error.prize}</label>
              ) : (
                <label className="form__label">What is the prize? *</label>
              )}

              <textarea
                className="form__input"
                autoComplete="off"
                rows="4"
                cols="50"
                name="prize"
                value={input.prize}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-input">
              <div className="imgHolder">
                <img src={image} alt="Image" className="form__img" center />
              </div>

              <input
                type="file"
                autoComplete="off"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={handlePhoto}
                className="form__input"
                id="form-img"
              ></input>
              {error.image ? (
                <label className="image__label error" htmlFor="form-img">
                  {error.image}
                </label>
              ) : (
                <label className="image__label" htmlFor="form-img">
                  Click here to choose your image. *
                </label>
              )}
            </div>
          </Grid>
          <Grid item sm={12} md={6}>
            <div className="form-input">
              {error.value ? (
                <label className="form__label error">{error.value}</label>
              ) : (
                <label className="form__label">
                  Total Giveaway Value? (in dollars) *
                </label>
              )}
              <div className="input__div">
                <input
                  autoComplete="off"
                  className="form__input"
                  name="value"
                  type="number"
                  value={input.value}
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div className="form-input">
              {error.contact ? (
                <label className="form__label error">{error.contact}</label>
              ) : (
                <label className="form__label">
                  How will you contact the winner/s. *
                </label>
              )}

              <textarea
                autoComplete="off"
                rows="6"
                cols="50"
                className="form__input"
                name="contact"
                value={input.contact}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="date">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-evenly">
                  <KeyboardDatePicker
                    name="expiryDate"
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label={`${
                      error.expiryDate ? error.expiryDate : "Expiry Date*"
                    }`}
                    value={input.expiryDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />

                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Expiry Time *"
                    value={input.expiryDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </Grid>

          <Grid item xs={12}>
            <h1 className="enter__heading">How to enter the giveaway?</h1>
            <h4 className="enter__explanation">
              Please list all the requirements needed to earn a certain number
              of draws.
            </h4>
            <h4 className="enter__explanation">
              If there are multiple ways to do this, you can add more
            </h4>
            {error.enter && (
              <label className="form__label error">{error.enter}</label>
            )}
            <Requirements input={input} setInput={setInput} />
          </Grid>
        </Grid>
        <div className="form__buttons__div">
          <Button
            type="submit"
            variant="outlined"
            className="submit__button"
            size="large"
          >
            Submit
          </Button>
          {edit && (
            <Button
              variant="outlined"
              className="submit__button"
              size="large"
              onClick={() => {
                dispatch(setEdit(false));
                history.push(`/giveaway/${input._id}`);
              }}
            >
              Go Back
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
