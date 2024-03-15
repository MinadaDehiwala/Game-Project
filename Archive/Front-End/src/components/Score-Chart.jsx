// Leaderboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const Leaderboard = () => {
  return (
    <MDBContainer fluid className='d-flex align-items-start justify-content-center p-6' style={{ paddingTop: '3vh' }}>
      <MDBCard className='m-5' style={{ width: '80%', maxWidth: '800px', borderRadius: '15px', padding: '20px' }}>
        <MDBCardBody className='px-5'>
          <h1 className="leaderboard-title text-center">Leaderboard</h1>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Player Name</th>
                <th scope='col'>Score</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <th scope='row'>1</th>
                <td>Player 1</td>
                <td>100</td>
              </tr>
              <tr>
                <th scope='row'>2</th>
                <td>Player 2</td>
                <td>95</td>
              </tr>
              <tr>
                <th scope='row'>3</th>
                <td>Player 3</td>
                <td>90</td>
              </tr>
              <tr>
                <th scope='row'>4</th>
                <td>Player 4</td>
                <td>85</td>
              </tr>
              <tr>
                <th scope='row'>5</th>
                <td>Player 5</td>
                <td>80</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          <div className="text-center">
            <Link to="/menu" className="btn btn-primary mt-3">Back to Main Menu</Link>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Leaderboard;
