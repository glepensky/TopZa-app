import React from "react";
import bonopizza from "./bonopizza.png";
import "./AboutPage.css";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
      <div className="about-container">
        <h3 className="about-content">
          Technologies:
          <br></br>
          <br></br>
          Node.js
          <br></br>
          Express
          <br></br>
          React
          <br></br>
          Redux
          <br></br>
          Postgres
          <br></br>
          Yelp Fusion API
          <br></br>
          <br></br>
          <br></br>
          Acknowledgements 🙏
          <br></br>
          <br></br>
          Special thank you to Prime’s amazing instructors and coaches: 
          <br></br>Alex,
          Chris, Zach, Marc, and Sam!! 
          <br></br>Thank you to fellow Tourmaline students
          for the encouragement and support.
          <br></br>
          <br></br>
          <br></br>
          More to come…
          <br></br>
          <br></br>Looking ahead, we're crafting a suite of savory features to
          enhance your pizza journey. Our future updates aim to include a rating
          system, allowing you to score each pizzeria based on categories like
          cheese, crust and presentation. 
          <br></br>In addition, so we'll be introducing a
          personalized note-taking feature for you to jot down those flavor
          nuances and memorable moments. 
          <br></br>We also know that anticipation is part
          of the fun, which is why we plan to roll out a "Wishlist" function to
          keep track of all the pizza places you're yearning to visit. 
          <br></br>Finally,
          get ready for the "Pizza Hall of Fame," a dedicated spot to celebrate
          the crème de la crème of pizzas as voted by you.Stay tuned for these
          updates and more as we continue to build the ultimate pizza-lover's
          companion app!
        </h3>
      </div>

      {/* Decorative Divider */}
      <div className="divider"></div>

      <div className="more-container">
        <div className="more-content">
          <p classnAME="more-text">
            I love pizza.
            <br></br>
            <br></br>
            Pizza is my Roman Empire.
            <br></br>
            <br></br>
            In the words of comedian Mike Birbiglia, I love pizza so much I get
            excited when I see the word “plaza”.
            <br></br>
            <br></br>I grew up in New Haven, Connecticut, which is famously
            known for its pizza, or ‘apizza’. Apizza is a style of pizza with a
            thin-crust, coal-charred crust and delicious “mootz” 🤌 forged in
            the fires of the Neapolitan technique. We have three pizzerias that
            we fondly call the Holy Trinity - Frank Pepe’s, Sally’s Apizza, and
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
    </>
  );
}

export default AboutPage;
