import React, { useState } from "react";
import "./Search.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, setSearch } from "../../redux/searchGiveaway";
import { setShow } from "../../redux/showSearch";
import { setGiveaway } from "../../redux/giveaways";
import { setSearchResults } from "../../redux/searchResults";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const show = useSelector((state) => state.show);
  const user = useSelector((state) => state.user);
  const searchResults = useSelector((state) => state.search);
  const [input, setInput] = useState("");
  const inputStyles = {
    marginRight: `${!user && "100px"}`,
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (input == "") dispatch(setGiveaway([]));
    else if (searchResults.length == 1 && searchResults[0] === "in-progress") {
      var startTime = Date.now();
      while (
        searchResults.length == 1 &&
        searchResults[0] === "in-progress" &&
        Date.now() - startTime < 60000
      ) {}

      if (searchResults.length == 1 && searchResults[0] === "in-progress") {
        alert("There was an error with your search. Please try again later");
        return;
      }
      dispatch(setGiveaway(searchResults));
    } else dispatch(setGiveaway(searchResults));

    dispatch(setSearchResults(true));
    dispatch(setShow(false));
    setInput("");
    history.push("/giveaways");
  };

  const handleInput = (event) => {
    setInput(event.target.value);
    if (!event.target.value) dispatch(getSearch("blank"));
    else dispatch(getSearch(event.target.value));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="header__center" style={inputStyles}>
            <input
              type="text"
              placeholder="Search for a YouTuber or giveaway ..."
              onChange={handleInput}
              value={input}
              onClick={() => {
                dispatch(setShow(true));
              }}
            />
            <SearchIcon />
          </div>
          <div className="searchResults">
            {show &&
              searchResults.length > 0 &&
              searchResults[0] == "in-progress" && (
                <div className="searches__loading">
                  <CircularProgress />
                </div>
              )}
            {show &&
              searchResults.length > 0 &&
              searchResults[0] != "in-progress" && (
                <List component="nav">
                  {searchResults.map((result, index) => {
                    const buttonStyles = {
                      width: "320px",
                      borderRadius: `${
                        index == 0 && index == searchResults.length - 1
                          ? "999px 999px 999px 999px"
                          : index == 0
                          ? "999px 999px 0 0"
                          : index == searchResults.length - 1
                          ? "0 0 999px 999px"
                          : "0 0 0 0"
                      }`,
                    };
                    return (
                      <div className="search__div" key={result._id}>
                        <ListItem
                          button
                          className="search__button"
                          style={buttonStyles}
                          onClick={() => {
                            dispatch(setSearch([]));
                            setInput("");
                            history.push(`/giveaway/${result._id}`);
                          }}
                        >
                          <ListItemText
                            primary={result.channel.name}
                            className="search__text"
                          />
                        </ListItem>
                      </div>
                    );
                  })}
                </List>
              )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
