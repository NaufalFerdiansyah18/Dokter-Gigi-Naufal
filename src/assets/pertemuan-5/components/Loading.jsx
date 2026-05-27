import Spinner from "./Spinner";

export default function Loading() {
  return (
    <Spinner
      size="lg"
      color="teal"
      label="Loading..."
      fullPage
    />
  );
}
