import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
 
const DraggableBar = () => {
 
    return (
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        scale={1}>
        <div>
          <div className="handle"><button>|</button></div>
        </div>
      </Draggable>
    );
}
 
export default DraggableBar;