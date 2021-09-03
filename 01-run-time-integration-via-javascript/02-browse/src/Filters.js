import React from "react";
import styled from "styled-components/macro";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import TextInput from "./components/TextInput";

const mediumScreen = `@media screen and (max-width: 855px)`;
const smallScreen = `@media screen and (max-width: 430px)`;

const FilterRow = styled.div`
  padding: 30px;
  font-size: 24px;
  display: flex;
  align-items: center;

  ${mediumScreen} {
    flex-direction: column;
    align-items: start;
  }
`;

const PriceRangeFields = styled.span`
  margin: 0 20px;
  display: flex;

  ${mediumScreen} {
    margin: 10px;
  }

  ${smallScreen} {
    flex-direction: column;
  }
`;

export default function Filters({
  name,
  priceRange,
  setNameFilter,
  setPriceRangeFilter,
  resetAll,
}) {
  return (
    <FilterRow>
      <TextInput label="Search:" value={name} onChange={setNameFilter} />
      <PriceRangeFields>
        Price range:
        <Checkbox
          label="$"
          checked={priceRange.$}
          onChange={setPriceRangeFilter("$")}
        />
        <Checkbox
          label="$$"
          checked={priceRange.$$}
          onChange={setPriceRangeFilter("$$")}
        />
        <Checkbox
          label="$$$"
          checked={priceRange.$$$}
          onChange={setPriceRangeFilter("$$$")}
        />
        <Checkbox
          label="$$$$"
          checked={priceRange.$$$$}
          onChange={setPriceRangeFilter("$$$$")}
        />
      </PriceRangeFields>
      <Button onClick={resetAll}>Clear</Button>
    </FilterRow>
  );
}

