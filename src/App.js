import { useState, useEffect, useRef, useCallback } from 'react';

import './App.css';


function App() {

  /* IMPORTANT: 
    Until solutions for window/element resize, applications of this
    effect should be limited to fixed width/height objects
  */

  const [svgWidth, setSVGWidth] = useState(0);
  const [svgHeight, setSVGHeight] = useState(0);
  const [xPos, setXPos] = useState(300);
  const [yPos, setYPos] = useState(230);
  const [sameColor, setSameColor] = useState(true);

  const svgRef = useCallback(node => {
    if (node !== null) {
      setSVGHeight(node.getBoundingClientRect().height);
      setSVGWidth(node.getBoundingClientRect().width);
    }
  }, []);

  /*useEffect(() => {
    setSVGWidth(svgRef.current.offsetWidth);
    setSVGHeight(svgRef.current.offsetHeight);
  }, [svgRef]);*/

  const mouseMoved = (e) => {
    setXPos((600/svgWidth)*(e.nativeEvent.offsetX));
    setYPos((600/svgHeight)*(e.nativeEvent.offsetY));
  }

  const mouseClicked = (e) => {
    setSameColor(!sameColor);
  }


  return (
    <div className="App">
      <svg className="goopy"
        onMouseMove={mouseMoved}
        onClick={mouseClicked}
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 600 600`}
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>
          <filter id="flattenBlur">
            <feComponentTransfer>
              <feFuncR type="identity"></feFuncR>
              <feFuncG type="identity"></feFuncG>
              <feFuncB type="identity"></feFuncB>
              <feFuncA type="discrete" tableValues="0 1"></feFuncA>
            </feComponentTransfer>
          </filter>
        </defs>
        <g>
          <g filter="url(#flattenBlur)">
            <g filter="url(#blur)">
              <rect x="0" y="0" width="100%" height="100%" fill="#fff0" />
    
              <circle cx={xPos} cy={yPos} r="75" fill={sameColor ? "#2a9d8f" : "#67b99a"} />

              <circle cx="100" cy="100" r="50" fill="#2a9d8f" />
              <circle cx="150" cy="300" r="100" fill="#2a9d8f" />
              <rect x="-50" y="400" width="700" height="250" fill="#2a9d8f" />

            </g>
          </g>
          <text x="10" y="20" fontWeight="bold">Absorbing Shapes Demo</text>
          <text x="400" y="20" fontWeight="normal">Click to change circle color.</text>
          {/*<rect x="0" y="400" width="100%" height="200" fill="#2a9d8f" />*/}
        </g>
      </svg>
    </div>
  );
}

export default App;
