import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { editorsInterface } from "../models/workspace";
import { useState } from "react";
import enviroment from "../enviroment";
import * as Realm from "realm-web";
import { InputLabel } from "@mui/material";
import { useUserAuthContext } from "../providers/UserAuthProvider";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
  width:100%;
  margin-bottom:20px;
`,
);

const InputWrapper = styled("div")(
  ({ theme }) => `
  border: 1px solid ${
    theme.palette.mode === "dark" ? "#434343" : "rgb(0 0 0 / 23%)"
  };
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 38px;;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

interface Props {
  intialVal: editorsInterface[];
  onValChange: (val: editorsInterface[]) => void;
}

const EditorsSelector: React.FC<Props> = ({ intialVal, onValChange }) => {
  const { user: loggedInUser } = useUserAuthContext();
  const [options, setOptions] = useState<editorsInterface[]>([]);

  async function onInputChange(_: React.SyntheticEvent, value: string) {
    if (value) {
      const app = new Realm.App({ id: enviroment.realm_app_id });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const results: editorsInterface[] =
          await user.functions.userEmailAutocomplete(value);
        setOptions(results.filter((each) => each.uid !== loggedInUser?.uid));
      } catch (_) {
        setOptions([]);
      }
    }
  }

  function isOptionEqualToValue(
    option: editorsInterface,
    value: editorsInterface,
  ) {
    return option.uid === value.uid;
  }

  function onChange(_: React.SyntheticEvent, value: editorsInterface[]) {
    onValChange(value);
    setOptions([]);
  }

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    options,
    multiple: true,
    value: intialVal,
    getOptionLabel: (option) => option.email,
    isOptionEqualToValue,
    onInputChange,
    onChange,
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <InputLabel>Add editors with email: </InputLabel>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option: editorsInterface, index: number) => (
            <StyledTag label={option.email} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} placeholder="ex: jhon.doe@gmail.com" />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof options).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.email}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
};

export default EditorsSelector;
