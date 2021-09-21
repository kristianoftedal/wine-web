/* eslint-disable react/prop-types */
import '../styles/globals.sass';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import 'rc-slider/assets/index.css';
import 'animate.css/animate.min.css';
import GlobalStyle from 'styles/styledGlobal';

const AppWrapper = styled.div`
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: auto;
  max-width: 90vw;
`;

function MyApp({ Component, pageProps }) {
  const [root, setRoot] = useState(null);
  const RecoilizeDebugger = dynamic(
    () => {
      return import('recoilize');
    },
    { ssr: false }
  );

  useEffect(() => {
    if (typeof window.document !== 'undefined') {
      setRoot(document.getElementById('__next'));
    }
  }, [root]);

  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
