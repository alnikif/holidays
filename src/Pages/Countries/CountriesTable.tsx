import React from 'react';
import { CountryType } from './Countries';
import { NumberCell } from '../../components/Table/NumberCell';
import { NameCell } from '../../components/Table/NameCell';
import { ImageCell } from '../../components/Table/ImageCell';
import { CodeCell } from '../../components/Table/CodeCell';
import { CurrenciesListCell } from '../../components/Table/CurrenciesListCell';
import { LinkCell } from '../../components/Table/LinkCell';
import './CountriesTable.scss';

export const CountriesTable: React.FC<CountryType> = (props) => {
  const { number, name, code, flag, currencies, languages, linkUrl } = props;
  return (
    <div className="countriesTableContainer">
      <NumberCell number={number} />
      <NameCell name={name} />
      <ImageCell flag={flag} />
      <CodeCell code={code} />
      <CurrenciesListCell currenciesListCell={currencies} />
      <LinkCell linkUrl={linkUrl} />
    </div>
  );
};
