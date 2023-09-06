import { IErrorResponse } from "@/types";

interface Props {
  errors: IErrorResponse[];
}

export default function ShowError({ errors }: Props) {
  return (
    <div className="alert alert-danger">
      <h4>Ooops...</h4>
      <ul className="my-0">
        {errors?.map((err) => (
          <li key={err.message}>{err.message}</li>
        ))}
      </ul>
    </div>
  );
}
