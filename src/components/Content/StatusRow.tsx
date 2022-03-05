import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateStatus } from "../../controllers/Status";
import { deleteStatus } from "../../controllers/Status";
import { Status } from "../../types/status";

type Props = {
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status[]>>
};

function StatusRow({ status, setStatus }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(status.title);
  const [color, setColor] = useState(status.color);

  const {id, categoryId}= status
  
  const handleEditClick = async () => {
      if(isEdit){
        await updateStatus({
          title,
          id
        })
      }
      setIsEdit((ex) => !ex)
  }

  const handleDelete =  async () => {
      await deleteStatus(id)
      setStatus(ex => ex.filter(item => item.id !== id))
  }


  return (
    <Box>
      <TextField value={title} onChange={(e) => setTitle(e.target.value)} disabled={!isEdit} />
      {/* <TextField value={color} onChange={(e) => setColor(e.target.value)} disabled={!isEdit} /> */}
      <button onClick={handleEditClick}>{isEdit ? "Save" : "Edit"}</button>
      <button onClick={handleDelete}>Delete</button>
    </Box>
  );
}
export default StatusRow;
