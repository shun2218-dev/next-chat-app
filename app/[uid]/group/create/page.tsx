"use client";
import React, {
  memo,
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
  FC,
} from "react";

// import { useFlashMessage } from "@/hooks/useFlashMessage";
import { useCreateGroup } from "@/hooks/useCreateGroup";
import { usePage } from "@/hooks/usePage";
import utilStyles from "@/styles/utils/utils.module.scss";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Form from "@/components/form";
import Input from "@/components/input";
import TextArea from "@/components/textArea";
import Button from "@/components/button";
// import FlashMessage from "@/components/flashMessage";
import Image from "next/image";
import { PageParam } from "@/types/PageParam";

type Props = {
  params: PageParam;
};

const Create: FC<Props> = memo(function CreateMemo({ params }) {
  const [desc, setDesc] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const { uid } = params;
  const createGroup = useCreateGroup(params);
  // const { messageState, flashState, reset } = useFlashMessage(3000);
  const { toHome } = usePage();
  const [image, setImage] = useState<File | null>(null);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    if (image && name && desc) {
      const data = { groupName: name, description: desc, owner: uid };
      await createGroup(data, image);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImage(e.target.files[0]);
    }
  };
  const AvatarImage = () => {
    if (image) {
      return (
        <Image
          src={URL.createObjectURL(image)}
          alt=""
          className={utilStyles.avatar}
        />
      );
    } else {
      // return <AccountCircleIcon sx={{ width: "60px", height: "60px" }} />;
      return <div>AccountCircle</div>;
    }
  };

  return (
    <>
      {/* {flashState && <FlashMessage {...messageState!} />} */}
      <Form title="Create a new group" onSubmit={async (e) => onSubmit(e)}>
        <div>
          <label htmlFor="avatar">
            <AvatarImage />
          </label>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="avatar"
            onChange={handleChange}
          />
        </div>
        <Input
          label="Group name"
          placeholder="Group name"
          required
          ref={nameRef}
        />
        <TextArea
          value={desc}
          onChange={onChange}
          label="Description"
          placeholder="Description about this group"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          margin="20px 0 0"
        >
          Next
        </Button>
        <Button
          type="button"
          color="transparent"
          variant="filled"
          onClick={() => toHome(uid!)}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
});

export default Create;
