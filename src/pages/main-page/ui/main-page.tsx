import React from "react";
import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";

export function MainPage(): React.ReactElement {
  const navigateTo = useNavigate();

  return (
    <div>
      <Button onClick={() => navigateTo("/task")}>
        Создать задачу
      </Button>
    </div>
  )
};