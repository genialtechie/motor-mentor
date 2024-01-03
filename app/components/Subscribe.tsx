'use client'

import { TextField, InputAdornment } from '@mui/material';
import Reveal from './Reveal'
import SendIcon from '@mui/icons-material/Send';

export default function Subscribe() {

    return (
        <Reveal>
        <section id='subscribe' className="h-screen w-screen flex items-center justify-center">
        <div className="container p-5 md:max-w-xl lg:max-w-3xl flex flex-col justify-center text-left">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold tracking-wide font-serif">
              Get Early Access to the Future of Car Diagnostics
            </h1>
            <h3 className="md:text-lg lg:text-xl text-gray-500 mt-2">
              Be the first to know when we launch.
            </h3>
            <form
              data-netlify="true"
              name="newsletter"
              method="POST"
              netlify-honeypot="bot-field"
              className="mt-10 md:mt-14 text-sm md:text-base h-10 md:h-14 flex flex-row items-center"
            >
              <TextField
                  id="outlined-basic"
                  label="Enter your email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SendIcon className="origin-center -rotate-45" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  className="mb-3 w-full"
                />
            </form>
            </div>
        </section>
        </Reveal>
    )
}