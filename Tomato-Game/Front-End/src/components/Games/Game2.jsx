import React, { useState, useEffect, useRef } from 'react';
import { MDBCard, MDBCardBody, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';

const Game2 = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Game variables
    let playerX = width / 2 - 25;
    let playerY = height - 50;
    let playerWidth = 50;
    let playerHeight = 20;
    let bullets = [];
    let enemies = [];
    let enemyWidth = 50;
    let enemyHeight = 30;
    let enemySpeed = 2;
    let gameLoop;

    // Player movement
    const movePlayer = (e) => {
      if (e.key === 'ArrowRight' && playerX + playerWidth < width) {
        playerX += 20;
      } else if (e.key === 'ArrowLeft' && playerX > 0) {
        playerX -= 20;
      }
    };

    // Shoot bullet
    const shootBullet = () => {
      const bullet = {
        x: playerX + playerWidth / 2,
        y: playerY,
        width: 5,
        height: 15,
      };
      bullets.push(bullet);
    };

    // Create enemies
    const createEnemies = () => {
      const enemyRows = 3;
      const enemiesPerRow = 10;
      for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemiesPerRow; col++) {
          const enemy = {
            x: col * (enemyWidth + 10) + 10,
            y: row * (enemyHeight + 10) + 30,
            width: enemyWidth,
            height: enemyHeight,
          };
          enemies.push(enemy);
        }
      }
    };

    // Draw game elements
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw player
      ctx.fillStyle = 'green';
      ctx.fillRect(playerX, playerY, playerWidth, playerHeight);

      // Draw bullets
      ctx.fillStyle = 'red';
      bullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });

      // Draw enemies
      ctx.fillStyle = 'blue';
      enemies.forEach((enemy) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      });
    };

    // Move bullets
    const moveBullets = () => {
      bullets = bullets.filter((bullet) => {
        bullet.y -= 10;
        return bullet.y > 0;
      });
    };

    // Move enemies
    const moveEnemies = () => {
      let moveDown = false;
      enemies.forEach((enemy) => {
        enemy.x += enemySpeed;
        if (enemy.x + enemy.width >= width || enemy.x <= 0) {
          moveDown = true;
          enemySpeed = -enemySpeed;
        }
      });
      if (moveDown) {
        enemies.forEach((enemy) => {
          enemy.y += enemyHeight;
        });
      }
    };

    // Check collisions
    const checkCollisions = () => {
      bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
          if (
            bullet.x > enemy.x &&
            bullet.x < enemy.x + enemy.width &&
            bullet.y > enemy.y &&
            bullet.y < enemy.y + enemy.height
          ) {
            enemies.splice(enemyIndex, 1);
            bullets.splice(bulletIndex, 1);
            setScore((prevScore) => prevScore + 10);
          }
        });
      });

      // Check if player is hit by enemy
      enemies.forEach((enemy) => {
        if (
          playerX < enemy.x + enemy.width &&
          playerX + playerWidth > enemy.x &&
          playerY < enemy.y + enemy.height &&
          playerY + playerHeight > enemy.y
        ) {
          setGameOver(true);
          clearInterval(gameLoop);
        }
      });

      // Check if enemies reach the bottom
      enemies.forEach((enemy) => {
        if (enemy.y + enemy.height >= height) {
          setGameOver(true);
          clearInterval(gameLoop);
        }
      });
    };

    // Game loop
   

    // Event listeners
    window.addEventListener('keydown', movePlayer);
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        shootBullet();
      }
    });

    // Create initial enemies
    createEnemies();

    // Clean up
    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', movePlayer);
    };
  }, []);

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    window.location.reload();
  };

  return (
    <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-40vh' }}
      >
        <MDBCard className="m-5" style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px', padding: '20px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol>
                <canvas ref={canvasRef} width="600" height="400" />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                {gameOver && (
                  <div>
                    <h2>Game Over</h2>
                    <p>Your score: {score}</p>
                    <button onClick={handleRestart}>Restart</button>
                  </div>
                )}
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </motion.div>
    </MDBContainer>
  );
};

export default Game2;