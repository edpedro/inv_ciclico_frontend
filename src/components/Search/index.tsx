import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface UIProps {
  handleSeach: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ handleSeach }: UIProps) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        marginLeft: "10px",
        marginBottom: "5px",
        display: "flex",
        alignItems: "center",
        width: 400,
        height: 80,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Pesquisar"
        inputProps={{ "aria-label": "Pesquisar" }}
        onChange={handleSeach}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
