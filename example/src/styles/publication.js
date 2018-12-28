import styled, { css } from 'styled-components'
import { Person } from 'styled-icons/material/Person'
import { People } from 'styled-icons/material/People'
import { FilePdf } from 'styled-icons/fa-solid/FilePdf'
import { Calendar } from 'styled-icons/octicons/Calendar'
import { ReplyAll } from 'styled-icons/material/ReplyAll'
import { Share } from 'styled-icons/material/Share'
import { Versions } from 'styled-icons/octicons/Versions'
import { Newspaper } from 'styled-icons/icomoon/Newspaper'

export default styled.div`
  padding: 0 1em;
  background: ${props => props.theme.white};
  border-radius: 0.5em;
  box-shadow: 0.1em 0.1em 1em ${props => props.theme.lightGray};
  overflow: hidden;
  h3 {
    padding-bottom: 0.8em;
    border-bottom: 4px solid ${props => props.theme.orange};
    background: ${props => props.theme.darkPurple};
    margin: 0 -1em;
    padding: 1em;
    a {
      color: ${props => props.theme.veryLightGray};
    }
  }
`

export const MetaData = styled.p`
  display: flex;
  flex-wrap: wrap;
  > :not(:last-child) {
    margin-right: 1em;
  }
`

const orange = css`
  color: ${props => props.theme.orange};
`

export const Authors = styled(Person).attrs(props => ({
  size: `1em`,
  as: props.count > 1 ? People : ``,
}))`
  margin-right: 0.3em;
  ${orange}
`

export const PDF = styled(FilePdf).attrs({ size: `1em` })`
  margin-right: 0.3em;
  ${orange}
`

export const Year = styled(Calendar).attrs({ size: `1em` })`
  margin-right: 0.3em;
  vertical-align: -0.15em;
  ${orange}
`

export const Journal = styled(Newspaper).attrs({ size: `1em` })`
  margin-right: 0.3em;
  ${orange}
`

export const Citations = styled(ReplyAll).attrs({ size: `1em` })`
  margin-right: 0.3em;
  transform: scale(-1, 1);
  vertical-align: -0.13em;
  ${orange}
`

export const Related = styled(Share).attrs({ size: `1em` })`
  margin-right: 0.3em;
  vertical-align: -0.15em;
  ${orange}
`

export const AllVersions = styled(Versions).attrs({ size: `1em` })`
  margin-right: 0.3em;
  vertical-align: -0.15em;
  ${orange}
`
