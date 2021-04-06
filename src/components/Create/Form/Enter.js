import React from "react";
import Grid from "@material-ui/core/Grid";
import "./Enter.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const Enter = ({ input, setInput, index }) => {
  const addReq = () => {
    setInput((prev) => {
      return {
        ...prev,
        enter: [
          ...prev.enter.slice(0, index),
          {
            ...prev.enter[index],
            requirements: [...prev.enter[index].requirements, ""],
          },
          ...prev.enter.slice(index + 1),
        ],
      };
    });
  };
  const removeReq = (index2) => {
    setInput((prev) => {
      return prev.enter[index].requirements.length != 1
        ? {
            ...prev,
            enter: [
              ...prev.enter.slice(0, index),
              {
                ...prev.enter[index],
                requirements: [
                  ...prev.enter[index].requirements.slice(0, index2),
                  ...prev.enter[index].requirements.slice(index2 + 1),
                ],
              },
              ...prev.enter.slice(index + 1),
            ],
          }
        : {
            ...prev,
            enter: [
              ...prev.enter.slice(0, index),

              ...prev.enter.slice(index + 1),
            ],
          };
    });
  };
  const handleReq = (index2, event) => {
    setInput((prev) => {
      return {
        ...prev,
        enter: [
          ...prev.enter.slice(0, index),
          {
            ...prev.enter[index],
            requirements: [
              ...prev.enter[index].requirements.slice(0, index2),
              event.target.value,
              ...prev.enter[index].requirements.slice(index2 + 1),
            ],
          },
          ...prev.enter.slice(index + 1),
        ],
      };
    });
  };
  const handleDraws = (event) => {
    setInput((prev) => {
      return {
        ...prev,
        enter: [
          ...prev.enter.slice(0, index),
          {
            ...prev.enter[index],
            draw: event.target.value,
          },
          ...prev.enter.slice(index + 1),
        ],
      };
    });
  };

  return (
    <div className="enter__div">
      <Button
        variant="outlined"
        className="add__req"
        onClick={addReq}
        style={{
          maxWidth: "25px",
          maxHeight: "25px",
          minWidth: "25px",
          minHeight: "25px",
        }}
      >
        <AddIcon />
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {input.enter[index].requirements.map((requirement, index2) => {
            return (
              <div className="single__req__div" key={index2}>
                <div className="enter_input">
                  <label className="form__label">Requirement</label>
                  <input
                    value={input.enter[index].requirements[index2]}
                    onChange={(event) => {
                      handleReq(index2, event);
                    }}
                    className="req__input"
                    autoComplete="off"
                  />
                </div>
                <IconButton
                  onClick={() => {
                    removeReq(index2);
                  }}
                  variant="outlined"
                  className="remove__button"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          })}
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="enter_input">
            <label className="form__label">Number</label>
            <input
              value={input.enter[index].draw}
              type="number"
              onChange={handleDraws}
              className="draws__value"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Enter;
