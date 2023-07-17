import React, { useState, useEffect } from 'react';
import WithParams from '../../components/WithParams';
import Container from '../../components/Container';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';

const StorePage = ({ params }) => {
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const id = params?.id;

  const handleEdit = () => {
    console.log(id, 'is edited');
    setIsEditing(true);
  };

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch(`https://some-data.onrender.com/stores/${id}`);
        const data = await response.json();
        setStore(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStore();
  }, [id]);

  return (
    <Container>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Store {store.id}</h1>
          <h2>{store?.name}</h2>
          <p>{store.cities}</p>
        </>
      )}
      <button onClick={handleEdit}>Edit</button>
      {isEditing && <Navigate to={PATHS.STORES.EDIT.replace(':id', id)} replace />}
    </Container>
  );
};

export default WithParams(StorePage);