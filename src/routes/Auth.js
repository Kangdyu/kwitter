import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "firebaseConfig";
import React from "react";

function Auth() {
  async function onSocialLogin(event) {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialLogin}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialLogin}>
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export default Auth;
