import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

import { fetchQuestion } from "./Game/api";
import { handleTimeOut, handleWrongAnswer, handleLevelComplete } from "./Game/GameLogic";
import GameUI from "./Game/GameUI";

const GameContainer = () => {
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(180);
  const [imageURL, setImageURL] = useState("");
  const [solution, setSolution] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSadRain, setShowSadRain] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const countdownRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    fetchQuestion(setLoading, setImageURL, setSolution, setTimer, level, setMessage);
  }, [level]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(countdown);
          handleTimeOut(setLevel, setScore, setShowSadRain);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    countdownRef.current = countdown;

    return () => clearInterval(countdown);
  }, [level, gameCompleted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const stringAnswer = answer.toString();
    const stringSolution = solution.toString();
    if (stringAnswer === stringSolution) {
      clearInterval(countdownRef.current);
      handleLevelComplete(level, setLevel, setScore, score, setAnswer, setShowConfetti, setShowSadRain);
    } else {
      handleWrongAnswer(setLevel, setScore, setAnswer, setShowSadRain, fetchQuestion);
    }
    clearInterval(countdownRef.current);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (playerRef.current) {
      playerRef.current.internalPlayer.mute();
    }
  };

  const handleYouTubeReady = (event) => {
    event.target.playVideo();
    if (isMuted) {
      event.target.mute();
    }
    playerRef.current = event.target;
  };

  return (
    <GameUI
      level={level}
      timer={timer}
      imageURL={imageURL}
      answer={answer}
      message={message}
      score={score}
      loading={loading}
      showConfetti={showConfetti}
      showSadRain={showSadRain}
      isMuted={isMuted}
      handleSubmit={handleSubmit}
      toggleMute={toggleMute}
      handleYouTubeReady={handleYouTubeReady}
    />
  );
};

export default GameContainer;
