import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getUser } from "../api";


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e1e2f, #2c2c54);
`;

const Card = styled.div`
  width: 380px;
  padding: 30px;
  border-radius: 20px;
  background: ${({ theme }) => theme.card || "#1f1f2e"};
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
`;

const Avatar = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4caf50;
  margin-bottom: 15px;
`;

const Name = styled.h2`
  margin: 10px 0;
`;

const Email = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const Joined = styled.p`
  margin-top: 10px;
  font-size: 13px;
  opacity: 0.7;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`;

const StatBox = styled.div`
  flex: 1;
`;

const StatNumber = styled.h3`
  margin: 0;
  color: #4caf50;
`;

const StatLabel = styled.p`
  font-size: 12px;
  opacity: 0.7;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: #4caf50;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
    background: #45a049;
  }
`;

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await getUser(id);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <Container>
      <Card>
        <Avatar
          src={
            user.img ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
        />
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
        <Joined>
          Joined: {new Date(user.createdAt).toDateString()}
        </Joined>

        {/* Future Fitness Stats */}
        <StatsContainer>
          <StatBox>
            <StatNumber>12</StatNumber>
            <StatLabel>Workouts</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>320</StatNumber>
            <StatLabel>Calories</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>8</StatNumber>
            <StatLabel>Streak</StatLabel>
          </StatBox>
        </StatsContainer>

    <Button>Edit Profile</Button>
      </Card>
    </Container>
  );
};

export default Profile;












