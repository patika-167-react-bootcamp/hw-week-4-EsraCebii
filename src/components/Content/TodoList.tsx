import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {list } from "../../controllers/Todo"
import { FilterTodoParams } from '../../types/todo';
import AddTodo from './AddTodo';
import { useState } from 'react';


export default function TodoList() {
  const[todos, setTodos]= useState<any>()
  
 
    useEffect(() => {
      fetchTodos()
    }, [])

    const fetchTodos = async () => {
      const {data } = await list()
      setTodos(data)


    }  
    
  return (
    <TableContainer component={Paper}>
      <AddTodo />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos && todos.map((item:any) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}