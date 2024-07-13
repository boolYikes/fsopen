const Profile = ({country}) => {
    if (!country){
        return null
    }else{
        const ico = `https://openweathermap.org/img/wn/${country.icon}@2x.png`
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
                <h2>Weather in {country.capital}</h2>
                <p>temperature: {Number((country.temperature - 273.15).toFixed(2))} Celcius</p>
                <img src={ico} alt="WeatherIcon"></img>
                <p>wind: {country.wind}</p>
            </>
        )
    }
}
export default Profile