import { Box, FormLabel } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


  const rootDateWrapper = {
    display: "flex",
    gap: "2rem",
  };

  const dateLabelWrapper = {
    display: "flex",
    gap: "1rem",
  };


const DateRangePicker = ({finalData,setFinalData}:any) => {

     const handleDateSelectStart = (e:any) => {
        setFinalData((prev:any)=>{return {
          ...prev,
          start: moment(e).toDate(),
        };})
     };

       const handleDateSelectEnd = (e: any) => {
         setFinalData((prev: any) => {
           return { ...prev, end: moment(e).toDate() };
         });
       };
  return (
    <Box sx={{ ...rootDateWrapper }}>
      <Box sx={{ ...dateLabelWrapper }}>
        <FormLabel>From </FormLabel>
        <DatePicker
          selected={new Date(finalData.start)}
          onChange={handleDateSelectStart}
          onSelect={handleDateSelectStart}
          showTimeSelect
          value={moment(finalData.start).format("YYYY-MM-DD h:mm A zz")}
          required
        />
      </Box>
      <Box sx={{ ...dateLabelWrapper }}>
        <FormLabel>To </FormLabel>
        <DatePicker
          selected={new Date(finalData.end)}
          onChange={handleDateSelectEnd}
          onSelect={handleDateSelectEnd}
          showTimeSelect
          value={moment(finalData.end).format("YYYY-MM-DD h:mm A zz")}
          required
        />
      </Box>
    </Box>
  );
}

export default DateRangePicker
