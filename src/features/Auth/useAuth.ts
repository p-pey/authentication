import { SubmitHandler, useForm } from "react-hook-form";

import CookieRepository from "@/repos/Cookies/ClientCookie.repo";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import AuthService from "./services";
import { AuthValidationSchema } from "./types";
import { AuthInputSchema, DEFAULT_VALUES } from "./validation";

export default function useAuth() {
       const router = useRouter()
       const { handleSubmit, register, formState, setValue, getValues } = useForm({
              resolver: zodResolver(AuthInputSchema),
              defaultValues: DEFAULT_VALUES,
              mode: "onChange"
       });

       const onSubmit: SubmitHandler<AuthValidationSchema> = async (data) => {
              try {
                     const loginData: Omit<AuthValidationSchema, 'formMessage'> = {
                            email: data.email,
                            password: data.password
                     }
                     const Service = new AuthService();
                     await Service.login(loginData);
                     setValue('formMessage', { message: 'Sucess Login', type: "SUCCESS" });
                     const CookieRepo = new CookieRepository();
                     CookieRepo.set('email', data.email);
                     router.push('/dashboard')

              } catch (e: unknown) {
                     const error = e as Error;
                     setValue("formMessage", { type: "ERROR", message: error.message })
              }
       };

       const formMessage = getValues('formMessage');

       return {
              handleSubmit,
              onSubmit,
              register,
              errors: formState.errors,
              formMessage
       }

}