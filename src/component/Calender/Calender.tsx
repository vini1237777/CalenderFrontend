import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { EventScheduleService } from "../../services/eventScheduler.service";
import { toast } from "react-hot-toast";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const BasicCalendar = (open:any) => {

const [events, setEvents] = useState<any[]>([]);

const fetchEvents = async () => {
  await EventScheduleService.getSchedule()
    .then((res: any) => {
      if (res.status === 200) {
        console.log(res)
        setEvents(res.data.events);
      }
    })
    .catch((err) => {
      toast.error("failed to fetch events");
    });
};

 const moveEvents=({ event, start, end }:any)=> {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

EventScheduleService.updateSchedule(event._id, updatedEvent)
  .then((res: any) => {
    if (res.status === 200) {
      toast.success("updated succesfully");
    }
  })
  .catch((err) => {
    toast.error("failed to fetch events");
  });
   setEvents(nextEvents);

    

  }

const resizeEvent = ({ event, start, end }:any) => {

  const nextEvents = events.map((existingEvent) => {
    return existingEvent.id == event.id
      ? { ...existingEvent, start, end }
      : existingEvent;
  });
    const updatedEvent = { ...event, start, end };


   EventScheduleService.updateSchedule(event._id, updatedEvent)
     .then((res: any) => {
       if (res.status === 200) {
         toast.success("updated succesfully");
       }
     })
     .catch((err) => {
       toast.error("failed to fetch events");
     });

     setEvents(nextEvents);
    

};

const expectedEvents = events.map(({start, end, ...rest}:any) =>
{
    return {  start: new Date(Date.parse(start)),
      end: new Date(Date.parse(end)),
      ...rest}
});

useEffect(() => {
fetchEvents();
}, [open]);


    
  return (
    <DragAndDropCalendar
      localizer={localizer}
      events={expectedEvents}
      style={{ height: 500 }}
      onEventDrop={moveEvents}
      resizable
      onEventResize={resizeEvent}
      selectable
      defaultView="month"
      defaultDate={moment().toDate()}
    />
  );
}
export default BasicCalendar;