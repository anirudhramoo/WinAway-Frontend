import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import addComma from "../../helper/addComma";
const Card = (props) => {
  const { giveaway_data, smaller } = props;
  const { image, channel, title, value, _id } = giveaway_data;
  const { name } = channel;

  return (
    <div className={!smaller ? "card" : "card margin10"}>
      <Link to={`/giveaway/${_id}`}>
        <img
          src={image}
          alt=""
          className={!smaller ? "card_img" : "card_img smaller_image"}
        />
      </Link>

      <div className="card__info">
        <h2 className={smaller ? "card__h2 smaller__font" : "card__h2"}>
          {name}
        </h2>
        <h4 className={smaller ? "card__h4 smaller__font" : "card__h4"}>
          {title}
        </h4>
        <h1
          className={smaller ? "card__h1 smaller__font" : "card__h1"}
        >{`$${addComma(value)}`}</h1>
      </div>
    </div>
  );
};

export default Card;
