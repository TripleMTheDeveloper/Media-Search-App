import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Function to add an item to the favorites list
  const addFavorite = (item) => {
    // Check if the item is already in the favorites list
    if (!favorites.some(favorite => favorite.trackId === item.trackId)) {
      setFavorites((prevFavorites) => [...prevFavorites, item]);
    }
  };

  // Function to remove an item from the favorites list
  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.trackId !== itemId)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
