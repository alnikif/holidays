import React from 'react';
import { CountryType } from './Countries';
import { NumberCell } from '../../components/Table/Cells/NumberCell';
import { NameCell } from '../../components/Table/Cells/NameCell';
import { ImageCell } from '../../components/Table/Cells/ImageCell';
import { CodeCell } from '../../components/Table/Cells/CodeCell';
import { CurrenciesListCell } from '../../components/Table/Cells/CurrenciesListCell';
import { LinkCell } from '../../components/Table/Cells/LinkCell';
import styles from './CountriesTable.module.scss';

export const CountriesTable: React.FC<CountryType> = (props) => {
  const { number, name, code, flag, currencies, languages } = props;
  return (
    <div className={styles.countriesTableContainer}>
      <NumberCell number={number} />
      <NameCell name={name} />
      <ImageCell flag={flag} />
      <CodeCell code={code} />
      <CurrenciesListCell currenciesListCell={currencies} />
      <LinkCell linkUrl={code} />
    </div>
  );
};
