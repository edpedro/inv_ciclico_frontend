import { FormEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { UIinventarioCreate } from "../../types";
import { useInventario } from "../../contexts/hooks/Inventario";
import { useUsers } from "../../contexts/hooks/Users";
import { useName } from "../../contexts/hooks/NewName";

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

interface SelectedItem {
  name: string;
  id: string | undefined;
}

interface UIPropsModal {
  setOpenAlocateEnd: (value: boolean) => void;
  openAlocateEnd: boolean;
  idInventario: string;
  nameInventario: string;
}

export default function ModalAlocateEndInventario({
  openAlocateEnd,
  setOpenAlocateEnd,
  idInventario,
  nameInventario,
}: UIPropsModal) {
  const { createInventario } = useInventario();
  const { createName, updateNameData, updateName, nameData } = useName();
  const { listAllUserData, lisUserData } = useUsers();

  const [file, setFile] = useState<File | null>();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const [userIds, setUsersIds] = useState<string[]>([]);

  const handleClose = () => setOpenAlocateEnd(false);

  useEffect(() => {
    listAllUserData();

    if (updateNameData) {
      const filterUserIds = nameData!
        .filter((name) => {
          return name.id === idInventario;
        })
        .flatMap((name) => name.users.map((user) => user.user_id));

      const filterNames = lisUserData
        ?.filter((value) => {
          return filterUserIds.includes(value.id);
        })
        .map(({ id, name }) => ({ id, name })) as SelectedItem[];

      setSelectedItems(filterNames);
      setUsersIds(filterUserIds);
    }
  }, [updateNameData, idInventario]);

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

    if (!idInventario || file === undefined) {
      return toast.error("Favor preencher todos dados!");
    }
    if (file !== null && file !== undefined) {
      const newData: UIinventarioCreate = {
        baseNameInventario_id: idInventario,
        file,
      };

      createInventario(newData);
    }
    setOpenAlocateEnd(false);
  };

  return (
    <div>
      <Modal
        open={openAlocateEnd}
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
                {nameInventario}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  mt: 1,
                }}
              >
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
                  Upload
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
