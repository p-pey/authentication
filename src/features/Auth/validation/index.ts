import Z from 'zod/v4';
import { AuthValidationSchema } from '../types';


export const AuthInputSchema = Z.object({
       email: Z.email(),
       password: Z.string().min(8),
       formMessage: Z.object({
              message: Z.string(),
              type: Z.union([Z.literal("SUCCESS"), Z.literal("ERROR")])
       }).optional()
});


export const DEFAULT_VALUES: AuthValidationSchema = {
       email: '',
       password: ''
}