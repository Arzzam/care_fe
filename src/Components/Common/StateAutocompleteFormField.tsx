import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { statusType, useAbortableEffect } from "@/Common/utils";
import AutocompleteFormField from "@/Components/Form/FormFields/Autocomplete";
import { FormFieldBaseProps } from "@/Components/Form/FormFields/Utils";
import { getStates } from "@/Redux/actions";

export type IState = {
  id: number;
  name: string;
};

type Props = FormFieldBaseProps<IState["id"]> & {
  placeholder?: string;
};

export default function StateAutocompleteFormField(props: Props) {
  const dispatch = useDispatch<any>();
  const [states, setStates] = useState<IState[]>();

  const fetchStates = useCallback(
    async (status: any) => {
      setStates(undefined);
      const res = await dispatch(getStates());
      if (!status.aborted && res && res.data) {
        setStates(res.data.results);
      }
    },
    [dispatch]
  );

  useAbortableEffect((status: statusType) => {
    fetchStates(status);
  }, []);

  return (
    <AutocompleteFormField
      {...props}
      options={states ?? []}
      optionLabel={(option) => option.name}
      optionValue={(option) => option.id}
      isLoading={states === undefined}
    />
  );
}
