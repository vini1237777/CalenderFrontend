import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Edit } from "@mui/icons-material";
import { Box, Divider, FormControl, FormGroup, FormLabel, InputLabel } from "@mui/material";
import BasicForm from "../Form/Form";
import DateRangePicker from "../DateTimePicker/DateRangePicker";
import BasicSelect from "../Select/Select";
import { color } from "../../styles/color";
import { EventScheduleService } from "../../services/eventScheduler.service";
import { toast } from "react-hot-toast";
import moment from "moment";


const rootWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const labelStyle = {
  marginBottom: "0.7rem",
  color: color.black,
};


export default function FormDialog({open,setOpen}:{open:boolean,setOpen:any}) {


    const [finalData, setFinalData] = React.useState<any>({
      title: "",
      start: moment(new Date()).toDate(),
      end: moment(new Date()).toDate(),
      description: "",
      priority: { label: "High", value: "high" },
    });



  const handleClose = () => {
    setOpen(false);
  };

  


  const handleSubmit=async()=>{
    await EventScheduleService.createSchedule(finalData)
      .then((res: any) => {
        if (res.status === 200) {
          toast.success('created successfully')
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error("failed to fetch events");
      });
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Edit /> Add Events
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ ...rootWrapper }}>
          <FormGroup>
            <BasicForm
              id={"title"}
              label={"Title"}
              type={"text"}
              placeholder={"title"}
              value={finalData.title}
              finalData={finalData}
              setFinalData={setFinalData}
            />
          </FormGroup>
          <FormGroup>
            <FormControl>
              <FormLabel sx={{ ...labelStyle }}>
                Select events date Time
              </FormLabel>
              <DateRangePicker
                finalData={finalData}
                setFinalData={setFinalData}
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <FormLabel sx={{ ...labelStyle }}>Priority</FormLabel>
              <BasicSelect finalData={finalData} setFinalData={setFinalData} />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <BasicForm
                id={"description"}
                label={"Description"}
                type={"text"}
                placeholder={""}
                sx={{ height: "130px" }}
                value={finalData.description}
                finalData={finalData}
                setFinalData={setFinalData}
              />
            </FormControl>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Save Changes</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
