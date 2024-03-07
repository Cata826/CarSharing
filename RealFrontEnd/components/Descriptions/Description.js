import React, { useEffect } from "react";
import "./Description.css";

function Description() {
  useEffect(() => {
    const car = document.getElementById("car");

    // Get the width of the page
    const pageWidth = document.documentElement.clientWidth;

    // Move the car from the left to the right
    function moveCar() {
      car.style.left = pageWidth - car.offsetWidth + "px";
    }

    // Call the moveCar function after a delay (you can adjust the delay)
    const timeoutId = setTimeout(moveCar, 1000); // 1000 milliseconds = 1 second

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []); // The empty dependency array ensures that this effect runs only once

  return (
    <div id="car" className="car"></div>
  );
}

export default Description;
