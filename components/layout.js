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
              background-color:	#1E2126;
              }
            `
          }
        </style>
    </body>
  );
};