'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl, 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';  
 
import { PasswordInput } from '@/components/ui/password-input';

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function Page() { 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) { 
    console.log(values);
  }

  return (
    <div className='min-w-screen min-h-screen px-6 grid grid-rows-3 justify-center bg-brand-primary-light bg-opacity-5'>
      <section className='font-semibold mx-6 flex flex-col gap-1 justify-end items-center pb-10'>
        <span className='text-3xl'>Admin Login</span>
      </section>
      <section className='max-w-md w-full h-fit px-8 py-6 flex flex-col items-center gap-4 border rounded-lg shadow-lg bg-white'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='john@example.com'
                      type='email'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Password' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='bg-brand-primary hover:bg-brand-primary-light focus:bg-brand-primary-light'
            >
              Submit
            </Button>
          </form>
        </Form>
      </section>
      <section></section>
    </div>
  );
}
