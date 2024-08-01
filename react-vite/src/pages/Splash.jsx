import React, { useDebugValue } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoards } from '../redux/board';

const Splash = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards.Boards);

  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch]);

  return <div>HELLO</div>;
};

export default Splash;
