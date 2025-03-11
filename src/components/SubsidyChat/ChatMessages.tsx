
import { Message } from "./types";
import { cn } from "@/lib/utils";

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, i) => (
        <div
          key={i}
          className={cn(
            "flex",
            message.type === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg p-3",
              message.type === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-900",
              "flex flex-col"
            )}
          >
            <div className="whitespace-pre-wrap break-words">{message.content}</div>
            {message.imageUrl && (
              <div className="mt-2 max-h-[200px] overflow-hidden rounded">
                <img 
                  src={message.imageUrl} 
                  alt="Uploaded content"
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
