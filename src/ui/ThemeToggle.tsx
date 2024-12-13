import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext";
import ButtonIcon from "./ButtonIcon";

function ThemeToggle() {
  const { isDark, setTheme } = useTheme();
  return (
    <ButtonIcon
      onClick={() =>
        setTheme((theme) => (theme === "light" ? "dark" : "light"))
      }
    >
      {isDark ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
    </ButtonIcon>
  );
}

export default ThemeToggle;
