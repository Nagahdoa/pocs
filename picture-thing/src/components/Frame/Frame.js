import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import image from '../../images/image.png';

export default class Frame extends Component {
    constructor() {
        super();

        const initialBlocks = this.getInitialBlocksState();
        this.state = {
            blocks: initialBlocks
        };
    }

    componentDidMount() {
        var img = document.getElementById('theImage');        
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        this.setState({ canvas });
    }

    getColorForPosition = (x, y) => {
        const data = this.state.canvas.getContext('2d').getImageData(x, y, 1, 1).data;
        const [r, g, b] = data;
        return `rgba(${r},${g},${b},1)`;
    };

    getInitialBlocksState = () => {
        return [{
            size: 400,
            posX: 0,
            posY: 0,
            color: 'rgba(243,134,50,1)'
        }];
    };

    reset = () => {
        const initialBlocks = this.getInitialBlocksState();
        this.setState({
            blocks: initialBlocks
        });
    }

    frameMouseMoveHandler = (event) => {
        const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
        const size = Number(hoveredElement.getAttribute('data-size'));
        const posX = Number(hoveredElement.getAttribute('data-posx'));
        const posY = Number(hoveredElement.getAttribute('data-posy'));
        const index = Number(hoveredElement.getAttribute('data-index'));
        
        const { blocks } = this.state;
        
        if (size <= 1) {
            return;          
        }
        
        const newSize = size / 2;
        const offsetPosX = posX + newSize;
        const offsetPosY = posY + newSize;

        const newBlock = {
            size: newSize,
            posX: posX,
            posY: posY,
            color: this.getColorForPosition(posX, posY)
        };
        const newBlock2 = {
            size: newSize,
            posX: offsetPosX,
            posY: posY,
            color: this.getColorForPosition(offsetPosX, posY)
        };
        const newBlock3 = {
            size: newSize,
            posX: posX,
            posY: offsetPosY,
            color: this.getColorForPosition(posX, offsetPosY)
        };
        const newBlock4 = {
            size: newSize,
            posX: offsetPosX,
            posY: offsetPosY,
            color: this.getColorForPosition(offsetPosX, offsetPosY)
        };

        blocks.splice(index, 1);
        blocks.push(newBlock, newBlock2, newBlock3, newBlock4);
        this.setState({ blocks });
    }

    render() {
        return (
            <div>
                <StyledFrame
                    id='theFrame'
                    height={400}
                    width={400}
                    onMouseMove={this.frameMouseMoveHandler}
                >
                    {this.state.blocks.map(({size, posX, posY, color}, index) => {
                        return <StyledBlock
                            key={index}
                            data-index={index}
                            data-size={size}
                            data-color={color}
                            data-posx={posX}
                            data-posy={posY}
                        />;
                    })}
                </StyledFrame>
                <StyledButton onClick={this.reset}>
                    Reset
                </StyledButton>
                <HiddenImage id='theImage' src={image} />
            </div>
        );
    }
}

const HiddenImage = styled.img`
    display: none;
`;

const StyledButton = styled.button`
    background: rgba(243,134,50,1);
    border: none;
    color: white;
    padding: 1em 3em;
    margin-top: 24px;
`;



const StyledBlock = styled.div.attrs({
    style: (attributes) => {
        const size = attributes['data-size'];
        const color = attributes['data-color'];
        const posx = attributes['data-posx'];
        const posy = attributes['data-posy'];

        return {
            background: color,
            height: `${size}px`,
            width: `${size}px`,
            top: `${posx}px`,
            left: `${posy}px`
        }
    },
})`position: absolute;`  

const StyledFrame = styled.div`
  position: relative;
  background: red;

  ${props =>
    props.height && props.width &&
    css`
      height: ${props.height}px;
      width: ${props.width}px;
    `};
`;
