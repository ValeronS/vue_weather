export default function useFirstUpperCase() {
  const firstUpperCase = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  return {
    firstUpperCase,
  };
}
