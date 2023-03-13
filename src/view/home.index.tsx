import { Button } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useEffect, useState } from "react";
import BasicCalendar from "../component/Calender/Calender";
import FormDialog from "../component/Modal/EditForm.modal";

import { toast } from "react-hot-toast";
import { EventScheduleService } from "../services/eventScheduler.service";

const rootStyles={
    marginTop:"4rem",
    paddingLeft:"4rem",
    paddingRight:"4rem",
    
}

const buttonStyles = {
  textAlign:"right",
  marginBottom:"2rem"
};

const Home = () => {

    const [open,setOpen]=useState<boolean>(false);
    
     const handleClickOpen = () => {
       setOpen(true);
     };

 
  return (
    <Box sx={{ ...rootStyles }}>
      <Box sx={{ ...buttonStyles }}>
        <Button onClick={handleClickOpen}>Add Event</Button>
      </Box>
      <BasicCalendar reload={open}/>
      {open && (
        <FormDialog open={open} setOpen={setOpen}  />
      )}
    </Box>
  );
}

export default Home
