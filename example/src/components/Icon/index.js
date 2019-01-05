import React from 'react'

const glyphs = {
  clock: (
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10zm2 0c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12z"
      />
      <path d="M15.64 17a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z" />
      <path d="M21.702 19.502a1 1 0 0 1-1.366.366l-5.196-3a1 1 0 0 1 1-1.732l5.196 3a1 1 0 0 1 .366 1.366z" />
    </g>
  ),
  person: (
    <g>
      <path d="M19,13c0,1.683 -0.271,2.241 -0.47,2.456c-0.162,0.176 -0.679,0.544 -2.53,0.544c-1.851,0 -2.368,-0.368 -2.53,-0.544c-0.199,-0.215 -0.47,-0.773 -0.47,-2.456c0,-1.657 1.343,-3 3,-3c1.657,0 3,1.343 3,3Zm0.835,3.977c0.879,-0.804 1.165,-2.104 1.165,-3.977c0,-2.761 -2.239,-5 -5,-5c-2.761,0 -5,2.239 -5,5c0,1.873 0.286,3.173 1.165,3.977c-1.664,0.911 -2.969,2.396 -3.649,4.189c-0.124,0.328 -0.153,0.708 0.052,0.993c0.568,0.789 1.674,-0.111 2.13,-0.97c1.007,-1.897 3.004,-3.189 5.302,-3.189c2.298,0 4.295,1.292 5.302,3.189c0.456,0.859 1.562,1.759 2.13,0.97c0.205,-0.285 0.176,-0.665 0.052,-0.993c-0.68,-1.793 -1.985,-3.278 -3.649,-4.189Z" />
    </g>
  )
}

const Icon = ({ is, glyph, size, ...props }) => {
  const Component = is
  return (
    <Component
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="1.414"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={glyph}
      viewBox="0 0 32 32"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      width={size}
      height={size}
      children={glyphs[glyph]}
      {...props}
    />
  )
}

Icon.defaultProps = {
  is: 'svg',
  glyph: 'clock',
  size: 32
}

export default Icon
