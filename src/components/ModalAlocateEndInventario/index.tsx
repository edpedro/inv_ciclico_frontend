import { useState, useEffect } from "react";
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
import ButtonGroup from "@mui/material/ButtonGroup";
import { useUsers } from "../../contexts/hooks/Users";
import { useName } from "../../contexts/hooks/NewName";
import { toast } from "react-toastify";
import { useInventario } from "../../contexts/hooks/Inventario";
import { UIuserList, UIAlocateEnd } from "../../types";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoading } from "../../contexts/hooks/Loanding";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

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
  width: 1200,
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
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
  idUpdate: string;
}

export default function ModalAlocateEndInventario({
  openAlocateEnd,
  setOpenAlocateEnd,
  idInventario,
  nameInventario,
  idUpdate,
}: UIPropsModal) {
  const { isLoadingFetch } = useLoading();
  const { updateNameData, nameData } = useName();
  const { lisUserData } = useUsers();
  const { alocateAddressData, alocateAddress, removeAlocateAddress } =
    useInventario();

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const [listUsersData, setListUsersData] = useState<UIuserList[]>([]);
  const [userIds, setUsersIds] = useState<string[]>([]);
  const [addressIds, setAddressIds] = useState<number[]>([]);
  const [arrayAddressId, setArrayAddressId] = useState<number[]>([]);
  const [Address, setAddress] = useState<string[]>([]);
  const [dataAddress, setDataAddress] = useState<
    Record<string, UIAlocateEnd[]>
  >({});
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleClose = () => setOpenAlocateEnd(false);

  useEffect(() => {
    if (updateNameData && alocateAddressData && lisUserData) {
      const filterUserIds = nameData!
        .filter((name) => {
          return name.id === idUpdate;
        })
        .flatMap((name) => name.users.map((user) => user.user_id));

      const filterNames = lisUserData
        ?.filter((value) => {
          return filterUserIds.includes(value.id);
        })
        .map(({ id, name }) => ({ id, name })) as SelectedItem[];

      const listUsersFiltered = updateNameData.users.map((ids) => ids.user_id);

      const listUsersFilteredData = lisUserData
        ?.filter((value) => {
          return listUsersFiltered.includes(value.id);
        })
        .map(({ id, name }) => ({ id, name })) as UIuserList[];

      setListUsersData(listUsersFilteredData);
      setSelectedItems(filterNames);
      setUsersIds(filterUserIds);

      const filterLetters = alocateAddressData.map((letter) =>
        letter.endereco.slice(0, -5)
      );

      const letterDuplicated = Array.from(new Set(filterLetters));

      setAddress(letterDuplicated);

      const result = alocateAddressData.sort((a, b) =>
        a.endereco
          .replace("ARM ", "")
          .localeCompare(b.endereco.replace("ARM ", ""))
      );
      const grouped = result.reduce<Record<string, UIAlocateEnd[]>>(
        (acc, item) => {
          const key = item.endereco.replace("ARM ", "").split(".")[0];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);
          return acc;
        },
        {}
      );

      setDataAddress(grouped);
    }
  }, [updateNameData, idInventario, lisUserData, alocateAddressData, idUpdate]);

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

  const handleAdressSelect = (latter: string) => {
    setSelectedButton(latter);
    if (alocateAddressData) {
      const filtered = alocateAddressData
        .filter((latterFilter) => latterFilter.endereco.slice(0, -5) === latter)
        .map((value) => value.id);

      setAddressIds(filtered);
    }
  };

  const handleAdressClean = () => {
    setSelectedButton(null);
    setAddressIds([]);
    setArrayAddressId([]);
  };

  const handlerAdressCheckbox = (latter: number) => {
    setArrayAddressId((prevArray) => {
      const index = prevArray.indexOf(latter);

      if (index !== -1) {
        return [...prevArray.slice(0, index), ...prevArray.slice(index + 1)];
      } else {
        return [...prevArray, latter];
      }
    });
  };

  const commonLogic = () => {
    if (
      !(
        userIds.length > 0 &&
        (addressIds.length > 0 || arrayAddressId.length > 0)
      )
    ) {
      toast.error("Favor preencher Usuário e Endereço!");
      return null;
    }

    return [
      {
        user_ids: userIds,
        baseInventario_ids: addressIds.length > 0 ? addressIds : arrayAddressId,
      },
    ];
  };

  const handleRemove = () => {
    const data = commonLogic();
    if (data === null) {
      return;
    }
    removeAlocateAddress(idInventario, data);
  };

  const handleUpdate = () => {
    const data = commonLogic();
    if (data === null) {
      return;
    }
    alocateAddress(idInventario, data);
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
          <Container component="main">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  {nameInventario} -{" "}
                  {updateNameData &&
                  updateNameData.firstStatus === true &&
                  updateNameData?.secondStatus === true
                    ? "Finalizado"
                    : "Pendente"}
                </Typography>
                <CancelPresentationIcon
                  fontSize="small"
                  color="error"
                  sx={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={handleClose}
                />
              </Box>

              <Box
                component="form"
                noValidate
                sx={{
                  mt: 1,
                }}
              >
                <FormControl sx={{ mt: 2, width: 300 }}>
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
                    {listUsersData &&
                      listUsersData.map((user) => (
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    {Address &&
                      Address.map((letters, index) => (
                        <Button
                          key={index}
                          onClick={() => handleAdressSelect(letters)}
                          color="success"
                          sx={{ width: 80 }}
                          variant={
                            selectedButton === letters
                              ? "contained"
                              : "outlined"
                          }
                        >
                          {letters}
                        </Button>
                      ))}
                  </ButtonGroup>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      ml: 1,
                      borderColor: "#48BD69",
                      color: "#fff",
                    }}
                    color="secondary"
                    onClick={() => handleAdressClean()}
                  >
                    Limpar
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{
                      ml: 1,
                      borderColor: "#48BD69",
                      color: "#fff",
                    }}
                    color="error"
                    onClick={handleRemove}
                    disabled={
                      updateNameData &&
                      updateNameData.firstStatus === true &&
                      updateNameData?.secondStatus === true
                    }
                  >
                    Remove
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{
                      ml: 1,
                      borderColor: "#48BD69",
                      color: "#fff",
                    }}
                    color="success"
                    onClick={handleUpdate}
                    disabled={
                      updateNameData &&
                      updateNameData.firstStatus === true &&
                      updateNameData?.secondStatus === true
                    }
                  >
                    Atualizar
                  </Button>
                </Box>
                {isLoadingFetch ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <CircularProgress color="success" />
                  </Box>
                ) : (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {Object.keys(dataAddress)
                      .sort()
                      .map((key) => (
                        <div key={key} style={{ margin: "10px" }}>
                          {dataAddress[key].map((item: UIAlocateEnd) => (
                            <div
                              key={item.id}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Checkbox
                                checked={arrayAddressId.includes(item.id)}
                                onClick={() => handlerAdressCheckbox(item.id)}
                              />

                              <span>
                                {item.endereco.replace("ARM ", "")} (
                                {item.users.map((user) => user.name).join(", ")}
                                )
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
