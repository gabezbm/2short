import { useState } from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Snackbar from "@mui/joy/Snackbar";

const SubmitForm = () => {
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(false);
  const [message, setMessage] = useState("");

  const postRecord = async (full, short) => {
    try {
      if (full === "") {
        setOk(false);
        setMessage("Full URL is required!");
        setOpen(true);
        return;
      }
      const res = await fetch("http://localhost:8000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full: full, short: short }),
      });
      setOk(res.ok);
      setMessage(await res.text());
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          postRecord(formJson.full, formJson.short);
        }}
      >
        <Stack
          sx={{ width: "80vw" }}
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Input
            fullWidth
            name="full"
            placeholder='Full URL (should include "http(s)://")'
          />
          <Input fullWidth name="short" placeholder="Short URL" />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Stack>
      </form>
      <Snackbar
        color={ok ? "success" : "danger"}
        variant="soft"
        autoHideDuration={2000}
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

export default SubmitForm;
