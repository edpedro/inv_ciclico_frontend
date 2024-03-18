import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDashboard } from "../../contexts/hooks/Dashboard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#48BD69",
    color: theme.palette.common.white,
    fontSize: 12,
    padding: "6px 16px",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: "6px 16px",
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function IndicatorPerfom() {
  const { dashboardData } = useDashboard();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Endereço</StyledTableCell>
            <StyledTableCell>TotalEnd</StyledTableCell>
            <StyledTableCell>SKUs</StyledTableCell>
            <StyledTableCell>Acuracidade</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboardData &&
            dashboardData.indicadorDesempenho &&
            dashboardData.indicadorDesempenho.map((item) => (
              <StyledTableRow key={item.Endereco}>
                <StyledTableCell>{item.Endereco}</StyledTableCell>
                <StyledTableCell>{item.TotalEnd}</StyledTableCell>
                <StyledTableCell>{item.TotalSkus}</StyledTableCell>
                <StyledTableCell>{item.Acuracidade}%</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
