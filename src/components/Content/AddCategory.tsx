import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, {useState, useEffect} from 'react'
import { create, categoryList } from '../../controllers/Category'
import { Category } from '../../types/categoy'
import CategoryRow from './CategoryRow'

interface Props {
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>
}

function AddCategory({handleTabChange, setSelectedCategoryId}: Props) {
  const [title, setTitle] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [isEdit, setIsEdit] = useState(false)

  const fetchCategories = async () => {
      const { data } = await categoryList()
      setCategories(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAddCategory = async () => {
    const { data } = await create({
      title,
    })
    setTitle("")
    setCategories((ex) => [...ex, data])
  }

  return (
    <Box>
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
         <Button onClick={handleAddCategory} variant="contained" sx={{ marginY: 1 }} type="submit">
          Add Category
        </Button>
       </Box>
       {categories?.map((category) => (
         <CategoryRow handleTabChange={handleTabChange} setSelectedCategoryId={setSelectedCategoryId} key={category.id} category={category} setCategories={setCategories} />
       ))}
    </Box>
  )
}

export default AddCategory