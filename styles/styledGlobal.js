import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .container {
    max-width: 90vw;
  }
  @media screen and (min-width: 1408px)
    .container:not(.is-max-desktop):not(.is-max-widescreen) {
        max-width: 90vw;
    }

@media screen and (min-width: 1216px)
.container:not(.is-max-desktop) {
    max-width: 95vw;
}
@media screen and (min-width: 1024px)
.container {
    max-width: 99vw;
}

.react-autosuggest__container {
  position: relative;
}

.react-autosuggest__input {
  border-color: #b5b5b5;
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  max-width: 100%;
  width: 100%;
  background-color: #fff;
  border: 1px solid transparent;
  border-color: #dbdbdb;
  color: #363636;
  -webkit-appearance: none;
  align-items: center;
  border-radius: .375em;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(.5em - 1px);
  padding-left: calc(.75em - 1px);
  padding-right: calc(.75em - 1px);
  padding-top: calc(.5em - 1px);
  position: relative;
  vertical-align: top;
}

.react-autosuggest__input--focused {
  outline: none;
}

.react-autosuggest__input--open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.react-autosuggest__suggestions-container {
  display: none;
}

.react-autosuggest__suggestions-container--open {
  display: block;
  position: absolute;
  top: 51px;
  width: 280px;
  border: 1px solid #aaa;
  background-color: #fff;
  font-family: Helvetica, sans-serif;
  font-weight: 300;
  font-size: 16px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 2;
}

.react-autosuggest__suggestions-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.react-autosuggest__suggestion {
  cursor: pointer;
  padding: 10px 20px;
}
.react-autosuggest__suggestion--highlighted {
  background-color: #dfe6e9;
}

.react-autosuggest__suggestion-match {
  background-color: #00b894;
  color: white;
}

`;

export default GlobalStyle;
