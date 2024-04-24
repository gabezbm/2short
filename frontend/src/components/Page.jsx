import SubmitForm from "./SubmitForm";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import UrlTable from "./UrlTable";
import Snackbar from "@mui/joy/Snackbar";
import { useEffect, useState } from "react";

const Page = () => {
  const [entries, setEntries] = useState([]);
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(false);
  const [message, setMessage] = useState("");

  const siteOrigin = import.meta.env.VITE_SITE_ORIGIN;
  useEffect(() => {
    fetch(`${siteOrigin}/api/list`, {})
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.entries);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [siteOrigin]);

  return (
    <>
      <Stack height="100vh" justifyContent="center" alignItems="center" gap={5}>
        <Typography level="h1" color="primary">
          Create Short URLs
        </Typography>
        <SubmitForm
          setEntries={setEntries}
          setOpen={setOpen}
          setOk={setOk}
          setMessage={setMessage}
        />
        {entries.length === 0 ? null : (
          <UrlTable
            entries={entries}
            setEntries={setEntries}
            setOpen={setOpen}
            setOk={setOk}
            setMessage={setMessage}
          />
        )}
      </Stack>
      <Snackbar
        color={ok ? "success" : "danger"}
        variant="soft"
        autoHideDuration={1500}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {message}
      </Snackbar>
    </>
  );
};

export default Page;
