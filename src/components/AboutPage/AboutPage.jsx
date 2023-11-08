import React from "react";
import bonopizza from "./bonopizza.png";
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    

    
    <div className="about-container">
      <div className="about-content">
        <p classnAME="about-text">
          I love pizza.
          <br></br>
          <br></br>
          Pizza is my Roman Empire.
          <br></br>
          <br></br>
          In the words of comedian Mike Birbiglia, I love pizza so much I get
          excited when I see the word “plaza”.
          <br></br>
          <br></br>I grew up in New Haven, Connecticut, which is famously known
          for its pizza, or ‘apizza’. Apizza is a style of pizza with a
          thin-crust, coal-charred crust and delicious “mootz” 🤌 forged in the
          fires of the Neapolitan technique. We have three pizzerias that we
          fondly call the Holy Trinity - Frank Pepe’s, Sally’s Apizza, and
          Modern Apizza. We are also quite creative with white clam pizza,
          mashed potato pizza, the Brussel Hustle... the list could go on. I
          created TopZa as both a celebration of pizza - a place to take
          meticulous notes and highly debatable ratings - as well as a way to
          test and push my programming skills. I hope you enjoy it! 
          <br></br> 
          <br></br>   
          ⬇️ Bono, the TopZa mascot ⬇️
        </p>
        <img src={bonopizza} alt="bono logo" />
      </div>
    </div>
  );
}

export default AboutPage;
