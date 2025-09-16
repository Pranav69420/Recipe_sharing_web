import React from "react";
import { useLoaderData } from "react-router-dom";
import foodImg from "../assets/pizza.jpg";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

export default function RecipeItems() {
  const allRecipes = useLoaderData();
  console.log(allRecipes);
  return (
    <>
      <div className="card-container">
        {allRecipes?.map((item, index) => {
          return (
            <div key={index} className="card">
              <img src={foodImg} width="120px" height="100px"></img>
              <div className="card-body">
                <div className="title">{item.title}</div>
                <div className="icons">
                  <div className="time">
                    <MdOutlineWatchLater />
                    30mins
                  </div>
                  <div className="likes">
                    <FaHeart />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
