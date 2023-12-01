import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";


const FetchRatings = (id) => {
    const [fetchError, setFetchError] = useState(null)
    const [ratings, setRatings] = useState(null)

    console.log("Here is the id:" + id);
    useEffect(() => {
        const fetchRatings = async () => {
            const { data ,error } = await supabase
            .from('Ratings')
            .select()


            if (error) {
                setFetchError('Could not fetch ratings')
                setRatings(null)
                console.log(error)
            }
            if (data) {
                setRatings(data)
                setFetchError(null)
            }
        }


        fetchRatings()


    }, [])


    return (
        <div className = "Ratings">
            {fetchError && (<p>{fetchError}</p>)}
            {ratings && (
                <div className = "Rating summary">
                    <p>LOVE</p>

                </div>
            )}
        </div>
    )
}

export default FetchRatings;
