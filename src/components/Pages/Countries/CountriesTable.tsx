import React from 'react';
import { CountryType } from './Countries';
import { NumberCell } from '../../Table/NumberCell';
import { NameCell } from '../../Table/NameCell';
import { ImageCell } from '../../Table/ImageCell';
import { CodeCell } from '../../Table/CodeCell';
import { CurrenciesListCell } from '../../Table/CurrenciesListCell';
import { LinkCell } from '../../Table/LinkCell';
import styles from './CountriesTable.module.scss';

export const CountriesTable: React.FC<CountryType> = (props) => {
  const { number, name, code, flag, currencies, languages, linkUrl } = props;
  return (
    <div className={styles.countriesTable}>
      <NumberCell number={number} />
      <NameCell name={name} />
      <ImageCell flag={flag} />
      <CodeCell code={code} />
      <CurrenciesListCell currenciesListCell={currencies} />
      <LinkCell linkUrl={linkUrl} />
    </div>
  );
};
