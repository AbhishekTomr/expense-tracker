import EmojiPickerComponent from "emoji-picker-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface IEmojiPicker {
  emoji: string;
  onChangeHandler: (id: string, value: string) => void;
}

const EmojiPicker = ({ emoji, onChangeHandler }: IEmojiPicker) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="absolute mt-6">
      <Button
        className=""
        variant={"outline"}
        onClick={() => setOpen((oldState) => !oldState)}
      >
        {emoji}
      </Button>
      <EmojiPickerComponent
        open={open}
        onEmojiClick={(event) => {
          onChangeHandler("emoji", event.emoji);
          setOpen(false);
        }}
      />
    </div>
  );
};

export default EmojiPicker;
