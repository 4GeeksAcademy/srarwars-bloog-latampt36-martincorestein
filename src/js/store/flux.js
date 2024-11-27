import { BASE_URL } from "../store/config";

const getState = ({ getStore, setStore }) => {

    return {
        store: {
            characters: [],
            planets: [],
            vehicles: [],
            favorites: []
        },
        actions: {
            loadData: async () => {
                try {
                    const fetchData = async (endpoint) => {
                        const response = await fetch(`${BASE_URL}${endpoint}`);
                        if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
                        const data = await response.json();
                        return data.results || [];
                    };

                    const [characters, planets, vehicles] = await Promise.all([
                        fetchData("people"),
                        fetchData("planets"),
                        fetchData("vehicles")
                    ]);

                    setStore({
                        characters,
                        planets,
                        vehicles
                    });
                } catch (error) {
                    console.error("Error loading data:", error.message);
                }
            },

            toggleFavorite : (item) => {
                const store = getStore();
                const uniqueId = `${item.uid}-${item.type}`;
                const isFavorite = store.favorites.some(fav => fav.uniqueId === uniqueId);
                const updatedFavorites = isFavorite
                  ? store.favorites.filter(fav => fav.uniqueId !== uniqueId)
                  : [...store.favorites, { ...item, type: item.type, uniqueId }];
                setStore({ favorites: updatedFavorites });
              }
              
            }
    };
};

export default getState;
