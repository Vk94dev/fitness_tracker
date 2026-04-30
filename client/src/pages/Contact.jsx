import React, { useState } from "react";
import styled from "styled-components";
import { addContact } from "../api";

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Wrapper = styled.div`
  width: 500px;
  background: ${({ theme }) => theme.card};
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  resize: none;
  height: 100px;
`;

const Button = styled.button`
  padding: 10px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Message = styled.p`
  text-align: center;
  color: green;
`;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
    const res = await addContact(form);

    if (res.data) {
     setSuccess(res.data.message);  
      setForm({ name: "", email: "", message: "" });
    } else {
      alert(data.message);
    }
  } catch (error) {
   alert(error.response?.data?.message);
    // alert("Something went wrong!");
  }
};


  return (
    <Container>
      <Wrapper>
        <Title>Contact Us</Title>

        <form style={{display:"flex", flexDirection:"column",gap:"5px",padding:"10px"}} onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />

          <TextArea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
          />

          <Button type="submit">Send Message</Button>
        </form>

        {success && <Message>{success}</Message>}
      </Wrapper>
    </Container>
  );
};

export default Contact;
