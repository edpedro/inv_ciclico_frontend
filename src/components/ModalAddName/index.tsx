import { FormEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { UInameCreate } from "../../types";
import { useName } from "../../contexts/hooks/NewName";
import { toast } from "react-toastify";
import { useUsers } from "../../contexts/hooks/Users";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface UIPropsModal {
  setOpen: (value: boolean) => void;
  open: boolean;
  idUpdate: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SelectedItem {
  name: string;
  id: string | undefined;
}

export default function ModalAddName({
  open,
  setOpen,
  idUpdate,
}: UIPropsModal) {
  const { listAllUserData, lisUserData } = useUsers();
  const { createName, updateNameData, updateName } = useName();

  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [userIds, setUsersIds] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    listAllUserData();

    if (updateNameData) {
      setName(updateNameData?.name as string);
      setDate(updateNameData?.date as string);
    }
    if (!idUpdate) {
      setName("");
      setDate("");
    }
  }, [updateNameData, idUpdate]);

  const handleChange = (event: SelectChangeEvent<typeof userIds>) => {
    const {
      target: { value },
    } = event;

    if (Array.isArray(value)) {
      const items = value!.map((name: string) => {
        const item = lisUserData!.find((user) => user.name === name);
        return { name, id: item?.id };
      });

      const ids = items!
        .map((item) => item.id)
        .filter((id) => id !== undefined) as string[];

      setUsersIds(ids);
      setSelectedItems(items);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("name") as string;
    const date = data.get("date") as string;
    const user_id = userIds as string[];

    if (!name || !date || user_id.length <= 0) {
      toast.error("Favor preencher todos dados!");

      return;
    }

    const newData: UInameCreate = { name, date, user_id };

    idUpdate ? updateName(idUpdate, newData) : createName(newData);

    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Criar Nome
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  color="success"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="date"
                  type="date"
                  id="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  autoComplete="current-date"
                  color="success"
                />
                <FormControl sx={{ mt: 2 }} fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label" sx={{}}>
                    Usuarios
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    color="success"
                    multiple
                    value={selectedItems.map((i) => i.name)}
                    onChange={handleChange}
                    input={<OutlinedInput label="Usuarios" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {lisUserData &&
                      lisUserData.map((user) => (
                        <MenuItem key={user.id} value={user.name}>
                          <Checkbox
                            checked={selectedItems.some(
                              (i) => i.name === user.name
                            )}
                          />
                          <ListItemText primary={user.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderColor: "#48BD69",
                    color: "#fff",
                  }}
                  color="success"
                >
                  Cadastrar
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
