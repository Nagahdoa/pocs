// absolute imports
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

// relative imports

// styled components
export const StyledClock = styled.div`
    display: flex;
    justify-content: center;
`;

export const StyledClockFace = styled.div`
    height: 400px;
    width: 400px;
    background: rgb(225, 255, 212);
    border-radius: 50%;
    display: flex;
    align-items: center;
`;

export const StyledClockSecondsHand = styled.div`
    background: black;
    height: 1px;
    width: 180px;
    margin-left: 20px;
    transform: rotate(0deg);
    transform-origin: 100%;
`;

export const StyledClockMinutesHand = styled.div`
    
`;

export const StyledClockHoursHand = styled.div`
    
`;

// presentational components
const createComponentFromStyledComponent = (StyledComponent) => ({children, ...props}) =>
    <StyledComponent {...props}>
        {children}
    </StyledComponent>;

export const Clock = createComponentFromStyledComponent(StyledClock);
export const ClockFace = createComponentFromStyledComponent(StyledClockFace);
export const ClockSecondsHand = createComponentFromStyledComponent(StyledClockSecondsHand);
export const ClockMinutesHand = createComponentFromStyledComponent(StyledClockMinutesHand);
export const ClockHoursHand = createComponentFromStyledComponent(StyledClockHoursHand);

// composition 
Clock.Face = ClockFace;
Clock.SecondsHand = ClockSecondsHand;
Clock.MinutesHand = ClockMinutesHand;
Clock.HoursHand = ClockHoursHand;

// container components
export default class ClockContainer extends Component {
    render() {
        return (
            <Clock>
                <Clock.Face>
                    <Clock.SecondsHand />
                    <Clock.MinutesHand />
                    <Clock.HoursHand />
                </Clock.Face>
            </Clock>
        );
    }
}