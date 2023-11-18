import React from 'react';
import { NumberCell } from '../../Table/NumberCell';
import { NameCell } from '../../Table/NameCell';
import { ImageCell } from '../../Table/ImageCell';
import { CodeCell } from '../../Table/CodeCell';
import { CurrenciesListCell } from '../../Table/CurrenciesListCell';
import { CountryType } from '../Countries/Countries';

export const CountriesTable: React.FC<CountryType> = (props) => {
  const { number, name, code, flag, currencies, languages } = props;
  return (
    <div>
      {/*<NumberCell number={number} languages={languages} />*/}
      {/*<NameCell name={name} />*/}
      {/*<ImageCell flag={flag} />*/}
      {/*<CodeCell code={code} />*/}
      {/*<CurrenciesListCell currenciesListCell={currencies} />*/}
      hello
    </div>
  );
};
