import React from 'react';
import Header from './header';
import { Container, } from 'semantic-ui-react';

export default props => {
  return (
    <body>
      <Container>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <Header/>
        { props.children }
      </Container>
      <style jsx>
          {
            `
            body {
              background-image: url("https://www.theblockbox.io/wp-content/uploads/2019/08/Blockchain-Technology-in-Healthcare.jpg");
              height: 100vh;
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
              }
            `
          }
        </style>
    </body>
  );
};