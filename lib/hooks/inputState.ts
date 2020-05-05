
import {
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type inputState = {
  value: string;
  heading: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  set: Dispatch<SetStateAction<string>>;
};

export const useInput: (initialValue: string, heading: string) => inputState = (
  initialValue: string,
  heading: string
) => {
  const [value, set] = useState(initialValue);
  return {
    value,
    heading,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      console.log(e.target.value);
      set(e.target.value);
    },
    set,
  };
};
