import styled from 'styled-components'

const ButtonScroll = styled.button`
  width: 60px;
  height: 60px;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: 50%;
  display: grid;
  place-content: center;
  font-size: 2.3rem;
  display: ${props => props.isVisible ? 'block' : 'none'};
`


export { ButtonScroll }