import { IErrorResponse, IUseRequest } from "@/types";
import axios from "axios";
import { useState } from "react";

export default function useRequest({ url, method, body }: IUseRequest) {
  const [errors, setErrors] = useState<IErrorResponse[]>([]);

  const sendRequest = async () => {
    try {
      setErrors([]);
      const response = await axios[method](url, body);
      return response.data;
    } catch (err: any) {
      setErrors(err.response.data.errors);
    }
  };

  return { sendRequest, errors };
}
