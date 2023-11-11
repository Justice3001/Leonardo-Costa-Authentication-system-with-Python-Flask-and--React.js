// src/components/Auth.js
import React, { useState } from 'react';
import { auth, provider } from '../firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Signed in successfully!');
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(provider);
      console.log('Signed in with Google successfully!');
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('Signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div>
      <h1>Authentication System</h1>
      <div>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Auth;
