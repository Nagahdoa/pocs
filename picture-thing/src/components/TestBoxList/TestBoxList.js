// absolute imports
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

// relative imports

// styled components
export const StyledBoxList = styled.div`
    width: 100%;
    min-height: 200px;
`;

export const StyledBox = styled.div`
    width: 100%;
    height: 200px;
    background: rgb(230, 255, 219);
    margin: 16px 0;
`;

export const StyledBoxHeader = styled.div`
    width: 100%;
    height: 50px;
    background: rgb(155, 201, 135);
    padding: 8px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// presentational components
const createComponentFromStyledComponent = (StyledComponent) => ({children, ...props}) =>
    <StyledComponent {...props}>
        {children}
    </StyledComponent>;

export const BoxList = createComponentFromStyledComponent(StyledBoxList);
export const Box = createComponentFromStyledComponent(StyledBox);
export const BoxHeader = createComponentFromStyledComponent(StyledBoxHeader);

// composition 
BoxList.Box = Box;
Box.Header = BoxHeader;

// container components
export default class TestBoxList extends Component {
    render() {
        const { Box } = BoxList; 

        return (
            <BoxList>
                {_.times(10, (index) => (
                    <Box key={index}>
                        <Box.Header>
                            Header {index}
                        </Box.Header>
                    </Box>
                ))}
            </BoxList>
        );
    }
}