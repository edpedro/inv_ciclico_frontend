export interface UIuser {
  id?: string;
  sub?: string;
  name: string;
  username: string;
  password: string;
  rules: string;
}
export interface UIuserList {
  id: string;
  name: string;
  username: string;
  rules: string;
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
  status: boolean;
  user: UIuser;
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
  saldoFisico?: number;
  status: boolean;
  username_id?: string;
  baseNameInventario_id: string;
  user?: {
    id: string;
    name: string;
    username: string;
  };
}
