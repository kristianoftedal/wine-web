import React, { useState } from 'react';
import { string, array, func } from 'prop-types';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

const getSuggestions = (value, data) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : data.filter(x => x.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = suggestion => suggestion;

const renderInputComponent = inputProps => (
  <div className="inputContainer">
    <div className="field has-addons">
      <div className="control">
        <input className="input" type="text" {...inputProps} />
      </div>
      <div className="control">
        <a className="button is-outlined" onClick={inputProps.onClear}>
          x
        </a>
      </div>
    </div>
  </div>
);

const renderSuggestion = (suggestion, { query }) => {
  const matches = AutosuggestHighlightMatch(suggestion, query);
  const parts = AutosuggestHighlightParse(suggestion, matches);

  return (
    <span>
      {parts.map((part, index) => {
        const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        );
      })}
    </span>
  );
};

export default function Typeahead(props) {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = getSuggestions(value, props.data);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    props.onSelected(suggestion.toLowerCase());
  };

  const inputProps = {
    placeholder: props.placeholder,
    value: value === 'none' ? '' : value,
    onChange: onChange,
    onClear: () => {
      props.onSelected('none');
      setValue('');
    }
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      renderInputComponent={renderInputComponent}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      highlightFirstSuggestion={true}
      onSuggestionSelected={onSuggestionSelected}
      {...props}
    />
  );
}

Typeahead.propTypes = {
  placeholder: string,
  data: array,
  onSelected: func
};
