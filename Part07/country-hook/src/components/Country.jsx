const Country = ({ country }) => {
  if (country === null) return null
  if (country.found === false) return <div>not found...</div>

  const { name, capital, population, flags } = country.data

  return (
    <div>
      <h3>{name.common}</h3>
      <div>capital {capital?.[0] ?? 'n/a'} </div>
      <div>population {population.toLocaleString()}</div> 
      <img 
        src={flags.png} 
        height='100' 
        alt={`flag of ${name.common}`}
      />  
    </div>
  )
}

export default Country