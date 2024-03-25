import { AxiosError } from "axios";
import { toast } from "sonner";

const errorHandler = (
  error: Error | AxiosError | unknown,
  defaultMessage = "An error ocurred, please try agane."
) => {
  if (error instanceof AxiosError)
    return toast.error(error?.response?.data.message);

  return toast.error(defaultMessage);
};

export { errorHandler };
