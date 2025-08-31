import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <AlertTriangle className="w-12 h-12 text-red-500 animate-bounce" />
<p className="mt-4 text-lg font-semibold text-red-600">{message}</p>
    </div>
  );
};

export default ErrorMessage;
