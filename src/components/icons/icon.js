import { SiTailwindcss, SiFirebase } from "react-icons/si";
import { FaReact, FaQuestionCircle } from "react-icons/fa";

const getIcon = (label) => {
  const iconMapper = {
    tailwind: SiTailwindcss,
    react: FaReact,
    firebase: SiFirebase,
  };

  const IconComponent = iconMapper[label] || FaQuestionCircle;

  return (
    <div title={label}>
      <IconComponent size={28} />
    </div>
  );
};

export default getIcon;
