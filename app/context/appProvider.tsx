import axios from 'axios';
import React, { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../constants/variables';
import { Item, Variation } from '../type/types';



interface StorageContextType {
  storage: Item[];
  isLoading: boolean;
  updateStorage: (items:Item[]) => void;
  updateItems: () => Promise<void>;
  updateVariation: (id: string, variationId: string, increase: boolean) => void;
}

export const StorageContext = createContext<StorageContextType>({
  storage: [],
  isLoading: false,
  updateStorage: () => {},
  updateItems: async () => {},
  updateVariation: async () => {}
});

interface StorageProviderProps {
  children: ReactNode;
}

export const StorageProvider: FC<StorageProviderProps> = ({ children }) => {
  const [storage, setStorage] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateStorage = (items: Item[]) =>{
    updateData(items);
  }

  const updateItemVariations = (itemId: string, newVariations: Variation[]) => {
    setStorage(prevItems =>
      prevItems.map(item =>
        item.id.toString() === itemId ? { ...item, variations: newVariations } : item
      )
    );
  };

  const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(BASE_URL+ '/withVariation');
        console.log(response.data);
        setStorage(response.data);
        console.log("API Call success")
      } catch (error) {
        console.log("API Call crashed")
        console.error(error);
      } finally {
        setIsLoading(false);
        console.log("API Call success 2")
      }
    };

  const updateData = async (items: Item[]) => {
      try {
        setIsLoading(true);
        const response = await axios.post(BASE_URL+ '/withVariation', items);
        console.log(response.data);
        setStorage(response.data);
        console.log("API Call success")
      } catch (error) {
        console.log("API Call crashed")
        console.error(error);
      } finally {
        setIsLoading(false);
        console.log("API Call success 2")

      }
    };

  const handleVariationCountChange = async (id: string,variationId: string, increase: boolean) => {
    //setLoading(true);
    const bodyData = {
      id: id,
      variationId: variationId,
      increase: increase
    };

    try {
      setIsLoading(true);
      const response = await axios.post(BASE_URL, bodyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      updateItemVariations(id, response.data)
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }finally{
      setIsLoading(false);
    }
};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StorageContext.Provider value={{ storage, updateStorage: updateStorage, updateItems: fetchData, updateVariation: handleVariationCountChange, isLoading }}>
      {children}
    </StorageContext.Provider>
  );
};