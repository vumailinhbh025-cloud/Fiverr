export interface RegisterData {
    id?:            number;
    name:          string;
    email:         string;
    password:      string;
    confirmPassword: string;
    phone:         string;
    birthday:      string;
    gender:        boolean;
    role:          string;
    skill:         string[];
    certification: string[];
  }

  export interface RegisterFormValues extends RegisterData {
  confirmPassword: string;
  }