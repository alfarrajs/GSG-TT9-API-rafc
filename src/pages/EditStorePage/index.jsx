import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WithParams from '../../components/WithParams';
import { H1 } from '../../components/Typography';
import Container from '../../components/Container';
import { PATHS } from '../../router/paths';
import { Navigate } from 'react-router-dom';
import StoreForm from '../../components/StoreForm';

const EditStorePage = ({ params }) => {
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGotToListPage, setIsGotToListPage] = useState(false);

  const id = params.id;

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

  const handleEditstore = async (body) => {
    setIsLoading(true);
    try {
      const res = await axios.put(`https://some-data.onrender.com/stores/${id}`, body);
      console.log(res.data);
      setStore(res.data);
      setIsLoading(false);
      setIsGotToListPage(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Container>
        <H1>Edit Store {id}</H1>

        <StoreForm
          store={store}
          handleSubmit={handleEditstore}
          isLoading={isLoading}
        />
      </Container>

      {isGotToListPage && <Navigate to={PATHS.STORES.ROOT} replace />}
    </div>
  );
};

export default WithParams(EditStorePage);