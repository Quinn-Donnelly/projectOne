import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  // .form-control {
  //   background-color : #d1d1d11a;
  //   color: #fff; 
  // }

  // input::-webkit-input-placeholder {
  //   color: #f3f3f394 !important;
  //   }
     
  //   input:-moz-placeholder { /* Firefox 18- */
  //   color: #f3f3f394 !important;  
  //   }
     
  //   input::-moz-placeholder {  /* Firefox 19+ */
  //   color: #f3f3f394 !important;  
  //   }
     
  //   input:-ms-input-placeholder {  
  //   color: #f3f3f394 !important;  
  //   }

  //   textarea::-webkit-input-placeholder {
  //     color: #f3f3f394 !important;
  //     }
       
  //     textarea:-moz-placeholder { /* Firefox 18- */
  //     color: #f3f3f394 !important;  
  //     }
       
  //     textarea::-moz-placeholder {  /* Firefox 19+ */
  //     color: #f3f3f394 !important;  
  //     }
       
  //     textarea:-ms-input-placeholder {  
  //     color: #f3f3f394 !important;  
  //     }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    //background-color: #1d2227eb;
    min-height: 100%;
    min-width: 100%;
    padding-top: 70px;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
