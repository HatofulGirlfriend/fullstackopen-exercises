const CountrySearchList = ({ country, buttonOnClick }) => {

return (
    <div>
        {country.name.common}{" "}<button onClick={() => buttonOnClick(country)}>show</button>
    </div>
)
}

export default CountrySearchList
