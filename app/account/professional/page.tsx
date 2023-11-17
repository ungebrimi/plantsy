import React from "react";
import Stats from "./components/Stats";
import Calendar from "./components/Calendar";
import Feed from "./components/Feed";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto py-12">
      <Stats />
      <Calendar />
      <Feed />
    </div>
  );
};

export default Home;
