import Reveal from './Reveal';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
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
      // Proceed with form submission logic
      const myForm = document.getElementById('sus-form') as HTMLFormElement;
      const formData = new FormData(myForm);

      const urlSearchParams = new URLSearchParams(formData as any);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlSearchParams,
      })
        .then(() => {
          alert('Successfully submitted!');
          setEmail('');
          router.push('/');
        })
        .catch((error) => alert(error));
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
              className={`"mb-3 w-full p-2 md:p-3 border-b bg-transparent outline-none focus:border-black " ${
                emailError ? 'border-red-500' : 'border-gray-500'
              }`}
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            <button
              type="submit"
              className="ml-2 bg-primary text-white px-4 py-2 md:py-3 md:px-5 rounded-lg hover:bg-white hover:text-primary hover:border hover:border-primary transition-all duration-300 ease-in-out"
            >
              <SendIcon className="origin-center -rotate-45 cursor-pointer" />
            </button>
          </form>
        </div>
      </section>
    </Reveal>
  );
}
