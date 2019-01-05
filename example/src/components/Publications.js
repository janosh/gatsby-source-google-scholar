import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Icon from './Icon'

const Grid = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-gap: 2rem;
`

const Link = styled.a``

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.0625);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 18px 35px 0 rgba(42, 51, 83, 0.12),
      0 8px 15px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`

const Name = styled.h3`
  background-color: #f3f7f9;
  color: #23446b;
  font-size: 1.125rem;
  text-align: center;
  font-weight: 700;
  padding: 1rem;
  margin: 0;
`

const Content = styled.div`
  flex: 1;
  padding: 0 1rem;
  color: #0c1e29;
`

const Meta = styled.div`
  padding: 0.5rem 1rem 0;
  border-top: 1px solid #dfe4e7;
  color: #4e616c;
`

const DetailsGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Detail = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5rem 1rem;
`

const IconWrapper = styled.span`
  margin-right: 0.25rem;
  margin-top: 0.2rem;

  svg {
    display: block;
  }
`

const Label = styled.span`
  font-weight: 600;
  /* color: #0c1e29; */
`

const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '…' : str

export default () => (
  <StaticQuery
    query={graphql`
      {
        pubs: allGoogleScholar {
          edges {
            node {
              id
              title
              url
              authors {
                name
                url
              }
              preEtAl
              postEtAl
              abstract
              year
              journal
              pdfUrl
              citedByCount
              citedByUrl
              relatedUrl
              allVersionsUrl
            }
          }
        }
      }
    `}
    render={({ pubs }) => (
      <Grid>
        {pubs.edges.map(({ node: pub }) => (
          <Link key={pub.id} href={pub.url} target="_blank">
            <Card>
              <Name>{truncateString(pub.title, 56)}</Name>
              <Content>
                <p>{truncateString(pub.abstract, 80)}</p>
              </Content>
              <Meta>
                <DetailsGrid>
                  <Detail>
                    <IconWrapper>
                      <Icon glyph="person" />
                    </IconWrapper>
                    <Label>{pub.authors[0].name}</Label>
                  </Detail>
                  <Detail>
                    <IconWrapper>
                      <Icon glyph="clock" />
                    </IconWrapper>
                    <Label>{pub.year}</Label>
                  </Detail>
                </DetailsGrid>
              </Meta>
            </Card>
          </Link>
        ))}
      </Grid>
    )}
  />
)
