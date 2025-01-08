import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

// Interface para o tipo de status
type StepStatus = "conferido" | "conferencia" | "divergencia" | "pendente";

interface CustomStepProps {
  label: string;
  status: StepStatus;
}

interface StepperProps {
  currentStatus: StepStatus;
  onRelease?: () => void;
  handleReleaseblocked?: () => void;
  idExpedicao: string;
  blocked?: boolean;
}

// Componente de ícone customizado
const CustomStepIcon = styled("div")<{
  color: string;
}>(({ color }) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor: color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
}));

// Componente de conectores customizado
const CustomConnector = styled("div")<{
  color: string;
}>(({ color }) => ({
  width: "100%",
  height: 2,
  backgroundColor: color,
}));

export default function CustomStepper({
  currentStatus,
  onRelease,
  handleReleaseblocked,
  idExpedicao,
  blocked,
}: StepperProps) {
  // Dados dos steps
  const steps: CustomStepProps[] = [
    { label: "Aguardando", status: "pendente" },
    { label: "Em Conferência", status: "conferencia" },
    { label: "Divergência", status: "divergencia" },
    { label: "Conferido", status: "conferido" },
  ];

  // Função para definir a cor com base no status atual e do step
  const getColor = (stepStatus: StepStatus): string => {
    // Para o step Pendente
    if (stepStatus === "pendente") {
      return currentStatus === "conferido" ||
        currentStatus === "conferencia" ||
        currentStatus === "divergencia"
        ? "#4caf50" // Verde
        : "#FFD700"; // Amarelo
    }

    // Para o step Em Conferência
    if (stepStatus === "conferencia") {
      if (currentStatus === "pendente") {
        return "#bdbdbd";
      }
      return currentStatus === "conferido"
        ? "#4caf50" // Verde
        : "#FFD700"; // Amarelo
    }

    // Para o step Divergência
    if (stepStatus === "divergencia") {
      return "#f44336"; // Vermelho
    }

    // Para o step Conferido
    if (stepStatus === "conferido") {
      return currentStatus === "conferido" ? "#4caf50" : "#bdbdbd"; // Verde se Conferido, cinza caso contrário
    }

    return "#bdbdbd"; // Cor padrão
  };

  // Função para determinar se o step deve ser visível
  const isVisible = (stepStatus: StepStatus): boolean => {
    if (stepStatus === "divergencia") {
      return currentStatus === "divergencia";
    }
    return true;
  };

  // Filtra os steps visíveis
  const visibleSteps = steps.filter((step) => isVisible(step.status));
  console.log(steps);

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Stepper nonLinear>
        {visibleSteps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={(props: StepIconProps) => (
                <CustomStepIcon color={getColor(step.status)}>
                  {props.icon}
                </CustomStepIcon>
              )}
              sx={{
                "& .MuiStepLabel-label": {
                  color: getColor(step.status),
                  fontWeight: "bold",
                },
              }}
            >
              {step.label}
              {step.status === "divergencia" &&
                (blocked === false ? (
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    sx={{
                      ml: 2,
                      minWidth: "30px", // largura mínima menor
                      padding: "2px 4px", // padding menor
                      fontSize: "0.6rem", // tamanho da fonte menor
                    }}
                  >
                    Liberado
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={handleReleaseblocked}
                    sx={{
                      ml: 2,
                      minWidth: "30px", // largura mínima menor
                      padding: "2px 4px", // padding menor
                      fontSize: "0.6rem", // tamanho da fonte menor
                    }}
                  >
                    Liberar
                  </Button>
                ))}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
