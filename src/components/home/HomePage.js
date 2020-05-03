import React, {useEffect, useState} from "react";
import RecipeList from "../recipe/RecipeList";
import axios, {setupAuthentication} from "../../networking/axiosConfig";

const HomePage = () => {
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        setupAuthentication()
        fetchRecipes(setRecipes, setError)
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <RecipeList recipes={recipes}/>
        </div>
    )
}

const fetchRecipes = async (setRecipes, setError) => {
    try {
        const response = await axios.get('recipes')
        setRecipes(response.data)
    } catch (exception) {
        setError("Něco se pokazilo\nZkuste to znovu.")
    }
}

export default HomePage