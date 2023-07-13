import { Paper, Divider } from '@mui/material';
import { useAtlasUser } from '@/context/UserContext';
import { useError } from '@/context/ErrorContext';
import Image from 'next/image';
import Link from 'next/link';
import { createRef } from 'react';
import { fetcher } from './QuickCheck';
import ProgressSpinner from './ProgressSpinner';

export default function DiagnoseCode(): JSX.Element {
  const { user } = useAtlasUser();
  const { setError } = useError();
  const codeRef = createRef<HTMLInputElement>();
  let obdData: any = null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //TODO: add api call to diagnose code
    const code = codeRef.current?.value;
    if (user?.cars && user?.cars.length > 1) {
      try {
        if (user.cars[0].vin && user.cars[0].mileage) {
          const data = await fetcher(
            `http://api.carmd.com/v3.0//diag?vin=${user.cars[0].vin}&mileage=${user.cars[0].mileage}&dtc=${code}`
          );
          data.data ? (obdData = data.data) : setError(true);
        } else {
          setError(true);
          alert(
            'You must update your car with a VIN and mileage to use this feature.'
          );
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    } else {
      alert('You must have a car added to your account to use this feature.');
    }
  }

  return (
    <Paper
      className="p-5 max-w-md w-full h-fit"
      elevation={6}
    >
      <h1 className=" font-bold font-serif text-left mb-2">
        Dash Light Diagnostics
      </h1>
      <Divider className="mb-6" />
      {obdData === null ? (
        <div>
          <Image
            src="/obd-reader.png"
            alt="obd reader"
            width={150}
            height={150}
            className="mx-auto mb-3"
          />
          <p className="text-center text-sm">
            See the{' '}
            <Link
              href="/dashboard/maint"
              className='hover:underline hover:text-primary after:content-["_↗"] transition-all duration-300 ease-in-out'
            >
              maintenance tab
            </Link>{' '}
            for a detailed guide on how to use an OBD reader to diagnose your
            car's dash lights.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter obd code"
              ref={codeRef}
              required
              className="mx-auto uppercase p-2 w-full mt-3 border focus:outline focus:outline-secondary-dark text-black font-normal focus:border-secondary-dark rounded-md"
            />
            <button
              type="submit"
              className="mx-auto block mt-3 w-full h-10 px-2 py-1 bg-primary border-white border-2 text-white rounded-lg hover:bg-white/50 hover:text-primary transition-all duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="font-semibold mb-3">
            <ProgressSpinner result="failure" /> {obdData.code}
          </h1>
          <p className="text-sm mb-1">{obdData.effect_on_vehicle}</p>
          <p className="text-sm mb-1">{obdData.responsible_system}</p>
          <button
            onClick={() => {
              obdData = null;
            }}
            className="mx-auto block mt-3 w-full h-10 px-2 py-1 bg-primary border-white border-2 text-white rounded-lg hover:bg-white/50 hover:text-primary transition-all duration-300 ease-in-out"
          >
            Enter a new code
          </button>
        </div>
      )}
    </Paper>
  );
}
