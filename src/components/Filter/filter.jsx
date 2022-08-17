import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledFilter } from "./style";
import Loader from "../Loader/loader";

import {
  filterByCategory,
  getInstruments,
  getAllCategories,
} from "../../redux/action/index";

function Filter({ setCurrentPage }) {
  const dispatch = useDispatch();

  const instruments = useSelector((state) => state.reducer.instruments);
  const categories = useSelector((state) => state.reducer.category);

  const [checkState, setCheckState] = useState("");
  const [dispatched, setDispatched] = useState(null);

  useEffect(() => {
    if (dispatched === null) {
      dispatch(getAllCategories());
      dispatch(getInstruments());

      console.log(checkState);
      setDispatched(false);
    }
  }, [dispatch]);

  const handleFilterCategory = (e) => {
    setCheckState(e.target.value);
    setCurrentPage(1);
    dispatch(filterByCategory(e.target.value));
  };

  return (
    <StyledFilter>
      {instruments.length ? (
        <div>
          Categories
          <div>
            <input
              type="radio"
              name="checkname"
              value="All"
              onChange={(e) => handleFilterCategory(e)}
            />{" "}
            All
            <br />
            {categories.map((category, index) => (
              <p key={`c${index}`}>
                <input
                  type="radio"
                  name="checkname"
                  value={category.name}
                  onClick={(e) => handleFilterCategory(e)}
                />{" "}
                {category.name.slice(0, 1).toUpperCase() +
                  category.name.slice(1)}
              </p>
            ))}
            <br />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </StyledFilter>
  );
}

export default Filter;
