export interface UIuser {
  id?: string;
  sub?: string;
  name: string;
  username: string;
  password: string;
  role: string;
  createdById?: string;
}
export interface UIuserList {
  id: string;
  name: string;
  username: string;
  role: string;
  totalPoints?: number;
}

export interface UInameCreate {
  date: string;
  name: string;
  user_id: string[];
}
export interface UInameList {
  id: string;
  date: string;
  name: string;
  firstStatus: boolean;
  secondStatus: boolean;
  user: UIuser;
  users: {
    user_id: string;
    nameInventario_id: string;
    assignedAt: string;
    assignedBy: string;
  }[];
}

export interface IFile {
  name: string;
  size: number;
  type: string;
}

export interface UIinventarioCreate {
  baseNameInventario_id: string;
  file: IFile | null;
}

export interface UIinventarioList {
  id: number;
  item: string;
  descricao: string;
  endereco: string;
  tipoEstoque: string;
  catItem: string;
  saldoWms: number;
  firstCount: number;
  secondCount: number;
  firstStatus: boolean;
  secondStatus: boolean;
  username_id?: string;
  baseNameInventario_id: string;
  user?: {
    id: string;
    name: string;
    username: string;
  };
}

export interface UIdashboardList {
  totalSKU: number;
  totalEndereco: number;
  acuracidade: string;
  totalSegundaContagem: number;
  totalPrimeiraContagem: number;
  totalSomaDivergencias: number;
  totalSomaWms: number;
  totalSomaContagem: number;
  totalFalta: number;
  totalSobra: number;
  totalDivergencia: number;
  totalAcertos: number;
  evolucaoContagem: string;
}

export interface UIsecondUpdate {
  id: number;
  saldoFisico: number;
}

export interface UIwmsUpdate {
  id: number;
  saldoWms: number;
}

export interface UIhistoricList {
  id: number;
  item: string;
  descricao: string;
  endereco: string;
  tipoEstoque: string;
  catItem: string;
  saldoWms: number;
  firstCount: number;
  secondCount: number;
  firstStatus: boolean;
  secondStatus: boolean;
  username_id?: string;
  baseNameInventario: {
    name: string;
    date: string;
  };
  user?: {
    id: string;
    name: string;
    username: string;
  };
}
export interface UIitemHistoric {
  item: string;
}
