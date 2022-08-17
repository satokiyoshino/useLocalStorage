import { useLocalStorage } from '../hooks/useLocalStorage';

const IndexPage = () => {
  const [value, setValue] = useLocalStorage<string>('No Name', 'name', 3);
  return (
    <>
      <button
        onClick={() => {
          setValue('John');
        }}
      >
        John
      </button>
      <button
        onClick={() => {
          setValue('Bob');
        }}
      >
        Bob
      </button>
      <button
        onClick={() => {
          setValue('Smith');
        }}
      >
        Smith
      </button>
      <h1>NAME: {value}</h1>
    </>
  );
};

export default IndexPage;
