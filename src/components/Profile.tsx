import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
      <strong><h3>Profile</h3></strong> 
      <p>  
        <strong>Nome: </strong>{currentUser.user.full_name}
      </p>
      </header>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
      <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
        {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
      <strong>Authorities:</strong>
      <ul>
      {currentUser.user.roles && currentUser.user.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;