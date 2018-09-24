import React, { Component } from 'react';
import styled, { css } from 'styled-components'

export default class Block extends Component {
    render() {
        const { height, width, handleClick } = this.props;
        return (
            <StyledBlock onClick={handleClick} height={height} width={width} />            
        );
    }
}

const StyledBlock = styled.div`
background: red;
border: 2px solid palevioletred;

${props =>
  props.height && props.width &&
  css`
    height: ${props.height}px;
    width: ${props.width}px;
  `};
`;
