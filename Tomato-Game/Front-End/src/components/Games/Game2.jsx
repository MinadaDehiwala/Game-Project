import React, { useEffect, useRef } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const Game2 = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleMainMenuClick = () => {
    navigate('/menu');
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let timer_start, timer_finish, timer_hide, timer_time, wrong, speed, timerStart;
    let game_started = false;
    let streak = 0;
    let max_streak = 0;
    let best_time = 99.999;


    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    // Set the canvas size
    canvas.width = 500;
    canvas.height = 500;

    let amountOfDots = 7;
    let selectedDot = null; // Keeps track of the selected dot, if any.
    let offset = { x: 0, y: 0 }; // Keeps track of the offset between the mouse position and the selected dot.

    let dots = [];
    let lines = [];

    let intersections = [];

    let showIntersections = true;

    function createDots() {
      let radius = 200;
      let centerX = 250;
      let centerY = 250;
      dots = [];

      for (let i = 0; i < amountOfDots; i++) {
        dots.push({
          x: Math.floor(centerX + radius * Math.cos(2 * Math.PI * i / amountOfDots)),
          y: Math.floor(centerY + radius * Math.sin(2 * Math.PI * i / amountOfDots)),
        });
      }
    }

    function createLines() {
      lines = [];
      let limit = new Array(dots.length).fill(0);
      let max_connects = 10;
      let finish = false;
      let tries = 0;
      while (finish === false) {
        tries += 1;

        if (tries > 100) {
          limit = new Array(dots.length).fill(0);
          lines = [];
          tries = 0;
        }

        let from = random(0, dots.length);
        let to = random(0, dots.length);
        if (from === to) {
          continue;
        }
        if (limit[from] === max_connects || limit[to] === max_connects) {
          continue;
        }
        if (lines.filter((el) => el.start === from && el.end === to).length > 0) {
          continue;
        }
        if (lines.filter((el) => el.start === to && el.end === from).length > 0) {
          continue;
        }
        limit[from] += 1;
        limit[to] += 1;

        lines.push({
          start: from,
          end: to
        });

        finish = true;
        limit.forEach(num => {
          if (num < 2) finish = false;
        });
      }
    }

    function drawDots() {
      ctx.fillStyle = 'green';
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 7, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function redraw() {
      // Clear the canvas.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Redraw the lines.
      drawLines();
      // Redraw the dots.
      drawDots();
    }

    function getLineDot(index) {
      return dots[index];
    }

    function detectIntersects() {
        intersections = [];
        lines.forEach(line => line.intersecting = null);
        // Detect intersecting lines
        for (let i = 0; i < lines.length; i++) {
          for (let j = i + 1; j < lines.length; j++) {
            const line1 = lines[i];
            const line2 = lines[j];
      
            // Calculate intersection point (if it exists)
            let intersection = getIntersection(getLineDot(line1.start).x, getLineDot(line1.start).y, getLineDot(line1.end).x, getLineDot(line1.end).y, getLineDot(line2.start).x, getLineDot(line2.start).y, getLineDot(line2.end).x, getLineDot(line2.end).y);
            const linepoints = [getLineDot(line1.start), getLineDot(line1.end), getLineDot(line2.start), getLineDot(line2.end)];
            if (intersection != null && linepoints.some(item => item.x === intersection.x && item.y === intersection.y)) {
              intersection = null;
            }
            if (intersection) {
              intersections.push(intersection);
            }
      
            // If there is an intersection, mark both lines as intersecting
            if (intersection != null) {
              line1.intersecting = true;
              line2.intersecting = true;
            }
          }
        }
      }

    function drawLines() {
        detectIntersects();
        ctx.lineWidth = 2;
        lines.forEach(line => {
          const { start, end } = line;
          ctx.beginPath();
          ctx.moveTo(getLineDot(start).x, getLineDot(start).y);
          ctx.lineTo(getLineDot(end).x, getLineDot(end).y);
          if (line.intersecting) {
            ctx.strokeStyle = 'red';
          } else {
            ctx.strokeStyle = 'green';
          }
          ctx.stroke();
        });
      }
    function mouseDown(e) {
        const rect = canvas.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
      
        // Loop through all the dots to see if the mouse is inside one of them.
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const dx = offsetX - dot.x;
          const dy = offsetY - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= 7) {
            selectedDot = i;
            offset.x = dx;
            offset.y = dy;
            break;
          }
        }
      }
      

      function mouseMove(e) {
        // If a dot is currently selected, move it to the new mouse position.
        if (selectedDot !== null) {
          const rect = canvas.getBoundingClientRect();
          dots[selectedDot].x = e.clientX - rect.left - offset.x;
          dots[selectedDot].y = e.clientY - rect.top - offset.y;
          redraw(); // Redraw the dots and lines.
        }
      }
    function mouseUp(e) {
      selectedDot = null;
      redraw();
    }

    function getIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
      let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (denominator === 0) {
        return null;
      }
      let x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denominator;
      let y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator;

      // Check if the intersection point is on both line segments
      if (x >= Math.min(x1, x2) && x <= Math.max(x1, x2) && y >= Math.min(y1, y2) && y <= Math.max(y1, y2) &&
        x >= Math.min(x3, x4) && x <= Math.max(x3, x4) && y >= Math.min(y3, y4) && y <= Math.max(y3, y4)) {
        return { x, y };
      }
      return null;
    }

    function checkWin() {
      if (lines.every(line => line.intersecting)) {
        console.log('You win!');
        // Add your win logic here
      }
    }

    function resetGame() {
      createDots();
      createLines();
      redraw();
    }

    // Event listeners
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mouseup', mouseUp);

    createDots();
    createLines();
    redraw();

    return () => {
      canvas.removeEventListener('mousedown', mouseDown);
      canvas.removeEventListener('mousemove', mouseMove);
      canvas.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  return (
<MDBCard
    className="w-75 my-5 mx-auto"
    style={{
      maxWidth: '70rem',
      minHeight: '40rem',
      backgroundColor: '#004d00', // Darker background color
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <MDBCardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MDBCardTitle style={{ color: 'white' }}>NoPixel Untangle Minigame</MDBCardTitle>
      <p style={{ color: 'white' }}>Inspired by NoPixel Minigames by Sharkiller</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <canvas ref={canvasRef} className="untanglecanvas" id="game-canvas"></canvas>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleMainMenuClick}>
  Main Menu
</button>
    </MDBCardBody>
  </MDBCard>
  );
};

export default Game2;
