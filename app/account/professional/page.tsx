import React from "react";
import Stats from "./components/Stats";
import Calendar from "./components/Calendar";
import Feed from "./components/Feed";

const Home = () => {
  return (
    <main>
      <Stats />
      <Calendar />
      <Feed />
    </main>
  );
};

export default Home;
