import { Button, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from "formik";
import React, { useEffect, useState } from 'react'
import { create, statusList } from '../../controllers/Status';
import { Status } from '../../types/status'
import StatusRow from './StatusRow';

interface Props {
  selectedCategoryId: number | null
}

function AddStatus({selectedCategoryId}: Props) {
    const[status, setStatus] = useState<Status[]>([])
    const [error, setError] = useState<string>();

    const fetchStatus = async () => {
        const { data } = await statusList({
          categoryId: selectedCategoryId as number
        })
        setStatus(data)
        console.log(data)
    }
    
  useEffect(() => {
   selectedCategoryId && fetchStatus()
  }, [])
    const formik = useFormik({
      initialValues: {
        title: "",
        color: "",
      },
      onSubmit: async (values) => {
        const {title, color} = values
        if(selectedCategoryId) {
          const { data } = await create({
            title,
            color,
            categoryId: selectedCategoryId
          })
          setStatus((ex) => [...ex, data])
        }
      },
    });

    
    
  return (
    <Box>
    <Box>
    <form onSubmit={formik.handleSubmit}>
    <TextField
       id="title"
       label="title"
       name="title"
       onChange={formik.handleChange}
       value={formik.values.title}
       variant="outlined"
       sx={{ marginY: 1 }}

     />
      <TextField
       id="color"
       label="color"
       name="color"
       onChange={formik.handleChange}
       value={formik.values.color}
       variant="outlined"
       sx={{ marginY: 1 }}

     />
 
      <Button  variant="contained" sx={{ marginY: 1 }} type="submit">
       Add Status
     </Button>
     </form>
    </Box>
    {status.map((status) => (
         <StatusRow key={status.id} status={status} setStatus={setStatus}  />
    ))}
 </Box>
  )
}

export default AddStatus