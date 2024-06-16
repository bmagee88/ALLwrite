import React from "react";

interface SelectableIconProps {
  isSelected: boolean;
  selectedIcon: () => JSX.Element;
  unselectedIcon: () => JSX.Element;
}

const SelectableIcon: React.FC<SelectableIconProps> = ({
  isSelected,
  selectedIcon,
  unselectedIcon,
}) => {
  return (
    <>
      {isSelected && selectedIcon()}
      {!isSelected && unselectedIcon()}
    </>
  );
};

export default SelectableIcon;
