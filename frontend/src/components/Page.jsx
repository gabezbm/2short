import SubmitForm from "./SubmitForm";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

const Page = () => {
  return (
    <>
      <Stack height="100vh" justifyContent="center" alignItems="center" gap={5}>
        <Typography level="h1" color="primary">
          Create Short URLs
        </Typography>
        <SubmitForm />
      </Stack>
    </>
  );
};

export default Page;
