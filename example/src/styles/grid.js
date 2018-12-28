import styled from 'styled-components'

export default styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${props => props.minWidth || `17em`}, 1fr)
  );
  grid-gap: ${props => props.gap || `1em`};
`
