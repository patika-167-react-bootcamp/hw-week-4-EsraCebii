import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { list } from "../../controllers/Todo";
import { FilterTodoParams } from "../../types/todo";
import AddTodo from "./AddTodo";
import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Category } from "../../types/categoy";
import { statusList } from "../../controllers/Status";
import TodoRow from "./TodoRow";

type Props = {
  categories?: Category[];
  outof?: boolean;
};

export default function TodoList({ categories, outof }) {
  const [todos, setTodos] = useState<any>();
  const [filteredTodos, setFilteredTodos] = useState<any>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>();
  const [selectedStatusId, setSelectedStatusId] = useState<any>();
  const [status, setStatus] = useState<any>([]);

  useEffect(() => {
    fetchTodos();
  }, []);
  useEffect(() => {
    fetchStatus();
  }, [selectedCategoryId]);
  useEffect(() => {
    fetchTodos();
  }, [outof, todos]);

  const fetchTodos = async () => {
    const { data } = await list();
    setTodos(data);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategoryId(event.target.value);
    console.log(selectedCategoryId, "selectedCategoryId");
  };
  const fetchStatus = async () => {
    const { data } = await statusList({
      categoryId: selectedCategoryId as number,
    });
    setStatus(data);
  };
  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatusId(event.target.value);
    console.log(selectedStatusId, "selectedStatusId");
  };
  return (
    <Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item>
            <InputLabel>Category</InputLabel>
            <Select
              id="categoryId"
              label="Category"
              onChange={handleChange}
              value={selectedCategoryId}
            >
              {categories.map((category: any) => (
                <MenuItem value={category.id}>{category.title}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <InputLabel>Status</InputLabel>

            <Select
              id="statusId"
              label="Status"
              onChange={handleStatusChange}
              value={selectedStatusId}
            >
              {status.length !== 0 &&
                status.map((item: any) => (
                  <MenuItem value={item.id}>{item.title}</MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ marginY: 4 }} type="submit">
              Filter
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box>{todos && todos.map((item: any) => <TodoRow todo={item} setTodos={setTodos} />)}</Box>
    </Box>
  );
}
