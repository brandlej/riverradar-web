"use client";
import { Fragment, useState, useEffect, useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { stateAbbrDict } from "../constants";

type Props = {
  rivers: River[];
};

type StateOption = {
  label: string;
  stateAbbr: string;
  type: "state";
};

type RiverOption = {
  label: string;
  uuid: string;
  stateAbbr: string;
  type: "river";
};

type StateRiversDict = {
  [key: string]: RiverOption[];
};

type SearchOption = RiverOption | StateOption;

export const SearchBar = ({ rivers }: Props) => {
  const stateRiversDict: StateRiversDict = useMemo(
    () =>
      rivers.reduce((acc, r) => {
        acc[r.stateAbbr] = [
          ...(acc[r.stateAbbr] || []),
          {
            label: `${stateAbbrDict[r.stateAbbr]} • ${r.name} - ${r.location}`,
            stateAbbr: r.stateAbbr,
            uuid: r.uuid,
            type: "river",
          },
        ];
        return acc;
      }, {} as StateRiversDict),
    [rivers]
  );

  const searchOptions: SearchOption[] = useMemo(() => {
    let options: SearchOption[] = [];

    Object.entries(stateAbbrDict).forEach(
      ([stateAbbr, stateName]: [stateAbbr: string, stateName: string]) => {
        const currentStateOption: StateOption = {
          label: `${stateName} • All Rivers`,
          stateAbbr: stateAbbr,
          type: "state",
        };
        const currentStateRiverOptions = stateRiversDict[stateAbbr];

        if (stateRiversDict[stateAbbr]?.length > 0) {
          options = [
            ...options,
            currentStateOption,
            ...currentStateRiverOptions,
          ];
        }
      }
    );
    return options;
  }, [stateRiversDict]);

  const { push } = useRouter();
  const [selected, setSelected] = useState<SearchOption | null>(null);
  const [filteredSearchOptions, setFilteredSearchOptions] =
    useState<SearchOption[]>(searchOptions);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filtered =
      query === ""
        ? searchOptions
        : searchOptions.filter(({ label }: SearchOption) =>
            label
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );
    setFilteredSearchOptions(filtered);
  }, [query]);

  useEffect(() => {
    if (!selected) return;

    if (selected.type === "river") {
      push(`/states/${selected.stateAbbr}/rivers/${selected.uuid}`);
    } else {
      push(`/states/${selected.stateAbbr}`);
    }
  }, [selected]);

  return (
    <div className="w-full max-w-2xl">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative border border-black w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full bg-white border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(river: River) => river?.name || ""}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Gallatin River"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredSearchOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredSearchOptions.map((searchOption: SearchOption) => (
                  <Combobox.Option
                    key={
                      searchOption.type === "river"
                        ? searchOption.uuid
                        : searchOption.stateAbbr
                    }
                    className={({ active }) =>
                      `relative cursor-pointer font-medium select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-50 text-black" : "text-black"
                      }`
                    }
                    value={searchOption}
                  >
                    {searchOption.label}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
