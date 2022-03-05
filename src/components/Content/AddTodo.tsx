import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import { useFormik } from "formik";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { create } from "../../controllers/Todo"
import { categoryList } from '../../controllers/Category';
import { Category } from '../../types/categoy';
import { statusList } from '../../controllers/Status';

function AddTodo() {
  const [title, setTitle] = useState("")
  const [categoryId, setCategoryId] = useState<number>()
  const [statusId, setStatusId] = useState<number>()
  const [categories, setCategories] = useState<Category[]>([])
  const [status, setStatus] = React.useState('')
  const fetchCategories = async () => {
    const { data } = await categoryList()
    setCategories(data)
}
// const fetchStatus= async () => {
//   const { data } = await statusList({
//     categoryId: 
//   })
//   setStatus(data)
// }
  return (
    <Box>
       <TextField
           id="title"
           fullWidth
           label="Title"
           name="title"
           variant="outlined"
           sx={{ marginY: 1 }}
           value={title}
           type="text"
           onChange={(e) => setTitle(e.target.value)}
        />
        <InputLabel >Category</InputLabel>
        <Select
          id="categoryId"
          name="categoryId"
          autoWidth
          label="Category"
        >
          <MenuItem value={1}>software</MenuItem>
          <MenuItem value={2}>homework</MenuItem>
        </Select>
        <InputLabel >Status</InputLabel>
        <Select
          id="statusId"
          name="statusId"
          autoWidth
          label="Status"
        >
          <MenuItem value={1}>To-Do</MenuItem>
          <MenuItem value={2} >In progress</MenuItem>
          <MenuItem value={3}>Done</MenuItem>
        </Select>
        <Button fullWidth variant="contained" sx={{ marginY: 1 }} type="submit">
          Add
        </Button>
    </Box>
  )
}

export default AddTodo;