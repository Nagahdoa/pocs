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
    position: relative;
`;

const clockHand = `
    background: black;
    height: 180px;
    transform: rotate(0deg);
    transform-origin: 100% 100%;
    position: absolute;
    top: 20px;
    left: 200px;
`;

export const StyledClockSecondsHand = styled.div`
    ${clockHand}
    width: 2px;    
    ${({ rotation = 0 }) =>
    css`
        transform: rotate(${rotation}deg);
    `};
`;


export const StyledClockMinutesHand = styled.div`
    ${clockHand}
    width: 2px;    
    ${({ rotation = 0 }) =>
    css`
        transform: rotate(${rotation}deg);
    `};
`;

export const StyledClockHoursHand = styled.div`
    ${clockHand}
    width: 2px;    
    ${({ rotation = 0 }) =>
    css`
        transform: rotate(${rotation}deg);
    `};
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
    state = {
        currentTick: 0,
        secondRotation: 0,
        minuteRotation: 0,
        hourRotation: 0,
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            100
        );
    }

    tick = () => {
        const {
            currentTick,
            secondRotation,
            minuteRotation,
            hourRotation
        } = this.state;

        const nextTick = currentTick + 1;
        const nextSecondRotation = secondRotation + 6;
        const nextMinuteRotation = currentTick % 60 === 0 ? minuteRotation + 6: minuteRotation;
        const nextHourRotation = currentTick % 3600 === 0 ? hourRotation + 6: hourRotation;

        this.setState({
            currentTick: nextTick,
            secondRotation: nextSecondRotation,
            minuteRotation: nextMinuteRotation,
            hourRotation: nextHourRotation
        });
    }

    render() {
        const { secondRotation, minuteRotation, hourRotation } = this.state;

        return (
            <Clock>
                <Clock.Face>
                    <Clock.SecondsHand rotation={secondRotation} />
                    <Clock.MinutesHand rotation={minuteRotation} />
                    <Clock.HoursHand rotation={hourRotation} />
                </Clock.Face>
            </Clock>
        );
    }
}