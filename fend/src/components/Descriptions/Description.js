import React from "react"
import "./Description.css"

function Description(){

    return (
        <div className="Description">
           <h1>Team</h1>
           <div id="Team">
                <h2>Breha Paula</h2>
                <h2>Balint Catalin</h2>
                <h2>Burdean Andrei</h2>
                <h2>Filip Cristian</h2>
           </div>
           <div id="TeamPhotos">
                <i className='bx bxs-user'></i>
                <i className='bx bxs-user'></i>
                <i className='bx bxs-user'></i>
                <i className='bx bxs-user'></i>
           </div>
        </div>
    );
}

export default Description