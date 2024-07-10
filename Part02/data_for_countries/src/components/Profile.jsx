const Profile = ({country}) => {
    if (!country){
        return null
    }else{
        return (
            <>
                <h1>{country.name}</h1>
                <p>capital: {country.capital}</p>
                <p>area: {country.area}</p>
                <p><strong>languages:</strong></p>
                <ul>
                    {Object.values(country.languages).map((name, idx) => 
                            <li key={idx}>{name}</li>
                    )}    
                </ul>
                <img src={country.flag.png} alt={country.flag.alt}></img>
            </>
        )
    }
}
export default Profile