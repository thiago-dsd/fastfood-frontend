export interface FilteredUser {
  name: string;
  email: string;
  password: string;
  role: string;
  id: string;
  created_at: string; 
  updated_at: string; 
}

export interface UserResponse {
  status: string;
  data: {
    user: FilteredUser;
  };
}

export interface UserLoginResponse {
  status: string;
  token: string;
}
