import { useState } from "react";

export default function Authenticate({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error,setError]= useState(null);

    async function handleClick() {
        try {
            const response= await fetch( "https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error(`Authentication failed, please try again`);
            }

            const result = await response.json();
            console.log("Authenticate Result: ", result);
            setSuccessMessage(result.message);
        } catch (error) {
            setError(error.message);
        }
    }

    return <div>
        <h2>Authenticate!</h2>
            {successMessage && <p className="successColor">{successMessage}</p>}
            {error && <p className="errorColor">{error}</p>}
            <button onClick={handleClick}>Authenticate Token!</button>
        </div>
  }