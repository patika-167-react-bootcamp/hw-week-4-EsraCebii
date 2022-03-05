import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { update, deleteCategory } from "../../controllers/Category";
import { Category } from "../../types/categoy";

type Props = {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>
};

function CategoryRow({ category, setCategories, handleTabChange, setSelectedCategoryId }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(category.title);

  const {id} = category

  const handleEditClick = async () => {
      if(isEdit){
        await update({
          title,
          id,
        })
      }
      setIsEdit((ex) => !ex)
  }

  const handleDelete =  async () => {
      await deleteCategory(id)
      setCategories(ex => ex.filter(item => item.id !== id))
  }

  const showStatuses = (e: any) => {
    setSelectedCategoryId(id)
    handleTabChange(e, 2)
  }

  return (
    <Box>
      <TextField value={title} onChange={(e) => setTitle(e.target.value)} disabled={!isEdit} />
      <button onClick={handleEditClick}>{isEdit ? "Save" : "Edit"}</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={showStatuses}>Show Statuses</button>
    </Box>
  );
}
export default CategoryRow;
