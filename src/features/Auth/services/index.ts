import FetchServiceSingleton from "@/singelton/Fetch.service";
import { AuthValidationSchema } from "../types";

export default class AuthService {

       async login(data: AuthValidationSchema) {
              // fake login interaction
              console.log({ data });
              return await FetchServiceSingleton.get('/api/?results=1&nat=us');;
       }
}