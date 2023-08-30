import { createGlobalStyle } from 'styled-components';

import { theme } from '../theme/theme';

const {colors} = theme

const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  body, body * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', 'Arial', sans-serif;
    font-size: 14px;
    color: ${colors.blue};
  }

  button, img, a, input {
    display: block;
  }

  ul {
    list-style: none;
  }

  p {
    font-size: 18px;
  }

  h1 {
    font-size: 28px;
  }
`;

export default Global;
