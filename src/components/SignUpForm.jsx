// SignUpForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { Form, Button } from 'react-bootstrap';

function SignUpForm() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signUp({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      // Redirect to the home page or another desired route after successful sign-up
      navigate('/');
    } catch (error) {
      setError('Error during sign-up. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSignUp}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p className="mt-3">
        Already have an account? <Link to="/sign-in">Sign In here</Link>
      </p>
    </Form>
  );
}

export default SignUpForm;
