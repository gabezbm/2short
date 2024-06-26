import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";

const SubmitForm = ({ setEntries, setOpen, setOk, setMessage }) => {
  const siteOrigin = import.meta.env.VITE_SITE_ORIGIN;
  const postRecord = async (full, short) => {
    try {
      if (full === "") {
        setOk(false);
        setMessage("Full URL is required!");
        setOpen(true);
        return;
      }
      if (short === "") {
        setOk(false);
        setMessage("Short URL is required!");
        setOpen(true);
        return;
      }
      const res = await fetch(`${siteOrigin}/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full: full, short: short }),
      });
      setOk(res.ok);
      setMessage(await res.text());
      setOpen(true);
      if (res.ok) {
        setEntries((prev) => [...prev, { full: full, short: short }]);
      }
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
          <Button type="submit" variant="soft">
            Create
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default SubmitForm;
