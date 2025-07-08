import Z from 'zod/v4';
import { AuthValidationSchema } from '../types';


export const AuthInputSchema = Z.object({
       email: Z.email().nullable(),
       password: Z.string().min(8).nullable()
});


export const DEFAULT_VALUES: AuthValidationSchema = {
       email: null,
       password: null
}