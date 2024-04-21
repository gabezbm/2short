import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

const UrlEntry = ({ full, short, setEntries, setOk, setMessage, setOpen }) => {
  const copyToClipboard = (short) => () => {
    navigator.clipboard.writeText(`https://2short.click/${short}`);
    setOk(true);
    setMessage("Short URL copied to clipboard!");
    setOpen(true);
  };
  const deleteRecord = (short) => async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/delete/${short}`, {
        method: "DELETE",
      });
      setOk(res.ok);
      setMessage(res.ok ? "Deleted" : "Short URL not found!");
      setOpen(true);
      if (res.ok) {
        setEntries((prev) => prev.filter((entry) => entry.short !== short));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card variant="plain" size="sm" color="neutral" width="100%">
        <Stack flex direction="row" spacing={2} justifyContent="center">
          <Typography
            flexGrow={99999}
            level="body-md"
            textColor="inherit"
            textAlign="center"
          >
            {full}&nbsp;→&nbsp;2short.click/{short}
          </Typography>
          <Button
            size="sm"
            variant="outlined"
            color="primary"
            onClick={copyToClipboard(short)}
          >
            Copy
          </Button>
          <Button
            size="sm"
            variant="outlined"
            color="success"
            onClick={() => {
              window.open(`https://2short.click/${short}`, "_blank");
            }}
          >
            Open
          </Button>
          <Button
            size="sm"
            variant="outlined"
            color="danger"
            onClick={deleteRecord(short)}
          >
            Delete
          </Button>
        </Stack>
      </Card>
    </>
  );
};

export default UrlEntry;
