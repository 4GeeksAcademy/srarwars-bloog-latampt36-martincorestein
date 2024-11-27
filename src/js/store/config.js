export const BASE_URL = "https://www.swapi.tech/api/";


export const mapTypeToAPI = (type) => {
    const typeMap = {
        characters: "people",
        planets: "planets",
        vehicles: "vehicles",
        starships: "starships",
        species: "species",
        films: "films",
    };
    return typeMap[type] || type;
};
