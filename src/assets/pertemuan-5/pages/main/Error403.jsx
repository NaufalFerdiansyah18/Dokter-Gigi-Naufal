import ErrorPage from "../../components/ErrorPage";

export default function Error403() {
  return <ErrorPage code={403} description="Akses ditolak. Kamu tidak diizinkan mengakses halaman ini." />;
}
