import Z from 'zod/v4';
import { AuthInputSchema } from './../validation/index';


export type AuthValidationSchema = Z.infer<typeof AuthInputSchema>;