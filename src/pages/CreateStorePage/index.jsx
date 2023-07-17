import React, { useState } from 'react';
import axios from 'axios';
import { H1 } from '../../components/Typography';
import Container from '../../components/Container';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import StoreForm from '../../components/StoreForm';

const CreateStorePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoToListPage, setIsGoToListPage] = useState(false);

  const handleCreateStore = async (body) => {
    setIsLoading(true);
    try {
      const res = await axios.post('https://some-data.onrender.com/stores', body);
      setIsLoading(false);
      setIsGoToListPage(true);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Container>
        <H1>Create Store</H1>

        <StoreForm handleSubmit={handleCreateStore} isLoading={isLoading} />
      </Container>
      {isGoToListPage && <Navigate to={PATHS.STORES.ROOT} />}
    </div>
  );
};

export default CreateStorePage;