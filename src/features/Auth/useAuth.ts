import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from '@hookform/resolvers/zod';
import { AuthValidationSchema } from "./types";
import { AuthInputSchema, DEFAULT_VALUES } from "./validation";

export default function useAuth() {
       const { handleSubmit, register } = useForm({
              resolver: zodResolver(AuthInputSchema),
              defaultValues: DEFAULT_VALUES
       });

       const onSubmit: SubmitHandler<AuthValidationSchema> = (data) => {
              console.log(data);
       };

       return {
              handleSubmit,
              onSubmit,
              register
       }

}