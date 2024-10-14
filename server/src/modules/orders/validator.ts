import { z } from 'zod';

export const createOrderSchema = z.object({
    // buyerInfo: z.object({
    //     name: z.string().nonempty({ message: 'Name is required' }),
    //     address: z.string().nonempty({ message: 'Address is required' }),
    //     phone: z.string().nonempty({ message: 'Phone number is required' }),
    //     email: z.string().email({ message: 'Invalid email address' }),
    //     district: z.string().nonempty({ message: 'District is required' }),
    //     sector: z.string().nonempty({ message: 'Sector is required' }),
    //     city: z.string().nonempty({ message: 'City is required' }),
    //     street: z.string().nonempty({ message: 'Street is required' }),
    //     house: z.string().nonempty({ message: 'House number is required' }),
    //     additionalInfo: z.string().optional(),
    // }).strict(), 

    products: z.array(
        z.object({
            id: z.string().nonempty({ message: 'Product ID is required' }),
            name: z.string().nonempty({ message: 'Product name is required' }),
            price: z.number({ invalid_type_error: 'Price must be a number' })
                .positive({ message: 'Price must be a positive number' }),
            quantity: z.number({ invalid_type_error: 'Quantity must be a number' })
                .int({ message: 'Quantity must be an integer' })
                .positive({ message: 'Quantity must be a positive number' }),
        })
    ).nonempty({ message: 'Products array cannot be empty' }),
    total: z.number({ invalid_type_error: 'Total must be a number' })
        .positive({ message: 'Total must be a positive number' }),
});
