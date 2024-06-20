import { useEffect, useState } from "react";
import socket from "../socket";

export default function Home() {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    const newCount = count + 1;
    setCount(newCount);

    socket.emit("count:update", newCount);
  };

  const handleDec = () => {
    const newCount = count - 1;
    setCount(newCount);

    socket.emit("count:update", newCount);
  };

  useEffect(() => {
    socket.on("message", (iniMessage) => {
      console.log({ iniMessage });
    });

    socket.on("count:info", (newCount) => {
      console.log({ newCount }, "<<<");
      setCount(newCount);
    });

    return () => {
      socket.off("message");
      socket.off("count:info");
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl">Realtime Counter</h1>
      <button
        onClick={handleAdd}
        className="bg-red-600 px-4 py-2 rounded-full text-white"
      >
        Increment
      </button>
      <span className="my-4 text-4xl">{count}</span>
      <button
        onClick={handleDec}
        className="bg-blue-600 px-4 py-2 rounded-full text-white"
      >
        Decrement
      </button>
    </div>
  );
}
