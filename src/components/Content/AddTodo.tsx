import { Box, Button, Grid, TextField } from "@mui/material";
import  { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { categoryList } from "../../controllers/Category";
import { Category } from "../../types/categoy";
import { statusList } from "../../controllers/Status";
import { create } from "../../controllers/Todo";
import TodoList from './TodoList'


function AddTodo() {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<any>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>();
  const [selectedStatusId, setSelectedStatusId] = useState<any>();
  const [todos, setTodos] = useState<any>()
  const [outof, setOutof] = useState<boolean>(false)

  const fetchCategories = async () => {
    const { data } = await categoryList();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchStatus();
  }, [selectedCategoryId]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategoryId(event.target.value);
    console.log(selectedCategoryId, "selectedCategoryId");
  };
  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatusId(event.target.value);
    console.log(selectedStatusId, "selectedStatusId");
  };
  const fetchStatus = async () => {
    const { data } = await statusList({
      categoryId: selectedCategoryId as number,
    });
    setStatus(data);
    console.log(status, "status");
  };
  const createTodo = async () => {
    const { data } = await create({
      categoryId: selectedCategoryId,
      statusId: selectedStatusId,
      title
    });
    setTodos(data);
    console.log(todos, "todos");
    setOutof(true)
    setTitle("")
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <InputLabel>Todo</InputLabel>
          <TextField
            fullWidth
            id="title"
            label="Title"
            name="title"
            variant="outlined"
            sx={{ marginY: 1 }}
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs>
          <InputLabel>Category</InputLabel>
          <Select
            id="categoryId"
            fullWidth
            label="Category"
            onChange={handleChange}
            value={selectedCategoryId}
          >
            {categories.map((category) => (
              <MenuItem value={category.id}>{category.title}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs>
          <InputLabel>Status</InputLabel>

          <Select
            id="statusId"
            fullWidth
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
        <Grid item xs>
          <Button variant="contained" sx={{ marginY: 4 }} type="submit" onClick={createTodo}>
            Add
          </Button>
        </Grid>
      </Grid>
      <TodoList categories={categories} outof={outof} />
    </Box>
  );
}

export default AddTodo;
