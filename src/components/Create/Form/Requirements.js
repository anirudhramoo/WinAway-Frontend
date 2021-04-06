import React from "react";
import "./Requirements.css";
import Grid from "@material-ui/core/Grid";
import Enter from "./Enter";
import Button from "@material-ui/core/Button";

const Requirements = ({ input, setInput }) => {
  const { enter } = input;

  const addEnter = () => {
    setInput((prev) => {
      return {
        ...prev,
        enter: [...prev.enter, { requirements: [" "], draw: 1 }],
      };
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={1}>
        <div className="button__div">
          <Button
            onClick={addEnter}
            className="addEnterButton"
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Grid>
      <Grid item xs={11}>
        <div className="outer__enter__reqdiv">
          {enter &&
            enter.map(
              (way, index) =>
                input.enter[index].requirements.length > 0 && (
                  <div key={index} className="div_between_enters">
                    <Enter input={input} setInput={setInput} index={index} />
                  </div>
                )
            )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Requirements;
