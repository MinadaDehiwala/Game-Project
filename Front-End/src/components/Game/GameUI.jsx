import React from "react";
import { motion } from "framer-motion";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBSpinner } from "mdb-react-ui-kit";
import YouTube from "react-youtube";
import Button from 'react-bootstrap/Button';

import { formatTime } from "./utils";

const GameUI = ({
  level,
  timer,
  imageURL,
  answer,
  message,
  score,
  loading,
  showConfetti,
  showSadRain,
  isMuted,
  handleSubmit,
  toggleMute,
  handleYouTubeReady
}) => (
  <motion.div>
    <MDBContainer fluid className="d-flex align-items-start justify-content-center p-6" style={{ paddingTop: "0vh" }}>
      <MDBCard className="m-5" style={{ width: "80%", maxWidth: "800px", backgroundColor: "white", borderRadius: "15px", padding: "20px", visibility: loading ? "hidden" : "visible" }}>
        <MDBCardBody className="px-5">
          {/* Game UI components */}
        </MDBCardBody>
      </MDBCard>
      {loading && (
        <div className="text-center">
          <MDBSpinner role="status">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      )}
    </MDBContainer>
    {/* Confetti and YouTube player components */}
  </motion.div>
);

export default GameUI;
