import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import { deleteTodo } from "../../controllers/Todo";

type Props = {
  todo: any;
  setTodos: React.Dispatch<React.SetStateAction<any>>
};
function TodoRow({ todo, setTodos }) {
    const {id} =todo;

    
  const handleDelete =  async () => {
    await deleteTodo(id)
    setTodos(ex => ex.filter(item => item.id !== id))
    
}

  return (
    <>
      <TableRow
        key={todo.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {todo.title}
        </TableCell>
        <TableCell component="th" scope="row">
          <Button onClick={handleDelete}>x</Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default TodoRow;
