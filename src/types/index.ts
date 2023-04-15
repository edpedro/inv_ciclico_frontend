export interface UIuser {
  id?: string;
  sub?: string;
  name?: string;
  username: string;
  password: string;
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
