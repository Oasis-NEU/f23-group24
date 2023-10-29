import React from "react";
import { useState } from "react";
import { supabase } from "./supabase";

export default function SongForm() {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    // const [date, setDate] = useState("");
    return (
        <div className = 'songForm'>
            <form // need to add each song to list of songs
            onSubmit={async(e) => {
                e.preventDefault();
                const result = await supabase.from("Ratings").insert({ review : review, rating : rating, created_at : new Date() });
                console.log(result);
            }}
            > 
                <label htmlFor = "form-review">Review: </label>
                <input
                    id = "form-review"
                    type = "text"
                    value = {review}
                    onChange={(e) => {
                        setReview(e.target.value);
                    }}
                    required
                />
                <br />
                
                <label htmlFor = "form-review">How many stars? </label>
                <label><input type="radio" name="radio" 
                    value = {rating}
                    onChange={(e) => {
                        setRating(e.target.value);
                    }}/></label>
                <label><input type="radio" name="radio"
                    value = {rating}
                    onChange={(e) => {
                        setRating(e.target.value);
                    }}/></label>
                <label><input type="radio" name="radio" 
                    value = {rating}
                    onChange={(e) => {
                        setRating(e.target.value);
                    }}/></label>
                <label><input type="radio" name="radio" 
                    value = {rating}
                    onChange={(e) => {
                        setRating(e.target.value);
                    }}/></label>
                <label><input type="radio" name="radio"
                    value = {rating}
                    onChange={(e) => {
                        setRating(e.target.value);
                    }}/></label>
                {/* <button name="one star">🎵</button> */}
                <br />

                <input type = "submit" value = "Submit"/>
            </form>
        </div>
    )
}