import makeRequest from "../api/makeRequest";
import url from "../api/urls";

export class EventScheduleService {
  static async getSchedule() {
    return makeRequest(url.getEvent, "get");
  }
  static async createSchedule(payload: any) {
    return makeRequest(url.createEvent, "post", payload);
  }
  static async updateSchedule(id: any, payload: any) {
    return makeRequest(url.createEvent + "/" + id, "put", payload);
  }
}