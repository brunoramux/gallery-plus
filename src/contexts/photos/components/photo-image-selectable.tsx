import type React from "react";
import { tv } from "tailwind-variants";

import { useState } from "react";
import InputCheckbox from "../../../components/input-checkbox";
import ImageFilePreview from "../../../components/image-file-preview";

export const photoImageSelectableVariants = tv({
  base: `
    cursor-pointer relative rounded-lg
  `,
  variants: {
    select: {
      true: "outline-2 outline-accent-brand",
    },
  },
});

interface PhotoImageSelectableProps
  extends React.ComponentProps<typeof ImageFilePreview> {
  selected?: boolean;
  onSelectImage?: (selected: boolean) => void;
}

export default function PhotoImageSelectable({
  className,
  selected,
  onSelectImage,
  ...props
}: PhotoImageSelectableProps) {
  const [isSelected, setIsSelected] = useState(selected);

  function handleSelect() {
    const newValue = !isSelected;

    setIsSelected(newValue);
    onSelectImage?.(newValue);
  }

  return (
    <label
      className={photoImageSelectableVariants({
        className,
        select: isSelected,
      })}
    >
      <InputCheckbox
        size="md"
        checked={isSelected}
        onChange={handleSelect}
        className="absolute top-1 left-1"
      />
      <ImageFilePreview {...props} className={className} />
    </label>
  );
}