import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import UrlEntry from "./UrlEntry";

const UrlTable = ({ entries, setEntries, setOpen, setOk, setMessage }) => {
  return (
    <Box width="80vw">
      <Typography level="h3" color="neutral" marginBottom="1rem">
        Created URLs
      </Typography>
      <Box maxHeight="50vh" overflow="auto">
        {entries.map((row) => (
          <UrlEntry
            key={row.short}
            full={row.full}
            short={row.short}
            setEntries={setEntries}
            setOpen={setOpen}
            setMessage={setMessage}
            setOk={setOk}
          />
        ))}
      </Box>
    </Box>
  );
};

export default UrlTable;
