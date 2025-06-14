import { z } from 'zod';

//Validation of new user registration
export const signup_schema = z.object({
    email: z.string().email().max(50, {
        message: 'Too Long.',
    }),
    password: z.string().min(6, {
        message: 'Weak password',
    }),
    full_name: z
        .string()
        .min(3, {
            message: 'A name should have atleast 3 characters',
        })
        .max(50, {
            message: 'Your name exceeds the 50 character limitation',
        }),
});
// Infer the type from the schema
export type signup_form_values = z.infer<typeof signup_schema>;

//To help in login form validation
export const login_schema = z.object({
    email: z.string().email().max(50, {
        message: 'Too Long.',
    }),
    //Strengthen the password more????
    password: z.string().min(6, {
        message: 'Weak password',
    }),
});

// Infer the type from the schema
export type login_form_values = z.infer<typeof login_schema>;
