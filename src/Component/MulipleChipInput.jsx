import React, { useEffect, useMemo, useRef, useState } from "react";
import classes from "./MultipleChipInput.module.css";

const MulipleChipInput = ({
  options,
  searchKeys,
  renderValue = (item) => item,
  placeholder = "",
  onChange = () => {},
}) => {
  const ref = useRef();
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const [highlightLast, setHighlightLast] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedInputs, setSelectedInput] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setHighlightLast(false);

    const filteredSuggestions = filteredOptions.filter((suggestion) =>
      searchKeys?.find((key) => {
        if (typeof suggestion === "object") {
          return suggestion?.[key]?.toLowerCase().includes(value.toLowerCase());
        }
        return suggestion?.toLowerCase().includes(value.toLowerCase());
      })
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue("");
    setSelectedInput((prev) => [...prev, suggestion]);
    setFilteredOptions((prev) => prev.filter((item) => item !== suggestion));
    setSuggestions([]);
  };

  const handleRemove = (value) => {
    setSelectedInput((prev) => prev?.filter((item) => item !== value));
    setFilteredOptions((prev) => [...prev, value]);
  };

  const handleRemoveLast = () => {
    setHighlightLast(false);
    if (selectedInputs?.length > 0) {
      setSelectedInput((prev) => prev.splice(-1));
    }
  };

  useEffect(() => {
    if (ref.current) {
      onChange(selectedInputs);
    } else {
      ref.current = true;
    }
  }, [selectedInputs]);

  console.log(highlightLast);

  return (
    <div ref={ref} className={classes.muliplechipinput}>
      <div
        className={`${classes.chip_box} ${
          highlightLast ? classes.highlight_last : ""
        }`}
      >
        {selectedInputs?.map((item) => (
          <div key={item?.id} className={classes.chip}>
            <div>{renderValue(item)}</div>
            <div
              className={classes.chip_cancel_icon}
              onClick={() => handleRemove(item)}
            >
              X
            </div>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && e.target.value === "") {
              if (highlightLast) {
                handleRemoveLast();
              } else {
                setHighlightLast(true);
              }
            }
          }}
          placeholder={placeholder}
        />
      </div>
      {suggestions.length > 0 && (
        <ul className={classes.suggestion_list}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion?.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className={classes.menu_item}>
                <div className={classes.avatar}>
                  <img src={suggestion?.image} alt="profile" />
                </div>{" "}
                {suggestion?.name} {suggestion?.email}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MulipleChipInput;
