import { useSelector } from "react-redux";

export const Store = (i) => {
  const d = useSelector((s) => s[i]);
  const t = useSelector((s) => s);
  return !d ? t : d;
};
