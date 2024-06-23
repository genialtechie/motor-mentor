import Reveal from './Reveal';
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { addEmail } from '@/utils/actions';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState('' as 'ok' | 'error' | '');
  const router = useRouter();

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    validateEmail();

    if (!emailError) {
      startTransition(async () => {
        const res = await addEmail(email);
        if (res?.status === 200) {
          setStatus('ok');
          setEmail('');
          // wait one second then empty status string
          setTimeout(() => {
            setStatus('');
          }, 1500);
        } else {
          setStatus('error');
          setEmailError('Something went wrong. Please try again <3');
          console.error(res);
        }
      });
    }
  };

  return (
    <Reveal>
      <section
        id="subscribe"
        className="h-screen w-screen flex items-center justify-center"
      >
        <div className="container p-5 md:max-w-xl lg:max-w-3xl flex flex-col justify-center text-left">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold tracking-wide font-serif">
            Get Early Access to the Future of Car Diagnostics
          </h1>
          <h3 className="md:text-lg lg:text-xl text-gray-500 mt-2">
            Be the first to know when we launch.
          </h3>
          <form
            id="sus-form"
            data-netlify="true"
            name="sus-form"
            method="POST"
            onSubmit={handleSubmit}
            netlify-honeypot="bot-field"
            className="mt-10 md:mt-14 text-sm md:text-base h-10 md:h-14 flex flex-row items-center"
          >
            <input
              type="hidden"
              name="form-name"
              value="sus-form"
            />
            <input
              placeholder="Enter your email"
              className={`"focus:bg-transparent focus:border-blue-400 mb-3 w-full p-2 md:p-3 border-b bg-transparent outline-none " ${
                emailError ? 'border-red-500' : 'border-gray-500'
              }`}
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail();
              }}
              onBlur={validateEmail}
            />
            <button
              type="submit"
              disabled={isPending}
              className={`" bg-primary ml-3 text-white px-4 py-2 md:py-3 md:px-5 rounded-lg hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-300 ease-in-out" ${
                isPending
                  ? 'cursor-not-allowed bg-slate-400 hover:bg-slate-400 hover:text-white border-none'
                  : status === 'ok'
                  ? 'bg-white '
                  : status === 'error'
                  ? 'bg-white text-primary'
                  : 'cursor-pointer'
              }`}
            >
              {isPending ? (
                <LoopIcon className="animate-spin" />
              ) : status === 'ok' ? (
                <CheckCircleIcon className="text-green-400" />
              ) : status === 'error' ? (
                <SmsFailedIcon />
              ) : (
                <SendIcon className="origin-center -rotate-45" />
              )}
            </button>
          </form>
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>
      </section>
    </Reveal>
  );
}
