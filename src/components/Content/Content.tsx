import React from 'react'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCategory from './AddCategory';
import AddStatus from './AddStatus';
import AddTodo from './AddTodo';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Content() {
  const [value, setValue] = React.useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Add Category" {...a11yProps(1)} />
          {/* <Tab label="Add Status" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <AddTodo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddCategory setSelectedCategoryId={setSelectedCategoryId} handleTabChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddStatus selectedCategoryId={selectedCategoryId} />
      </TabPanel>
    </Box>
  );
}