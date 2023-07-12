/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import classNames from 'classnames';
import { Product } from '../types';
import { ColumnTitles } from './ColumnTitles';

type Props = {
  products: Product[],
  isReversed: boolean,
  sortType: string,
  onReverseChange: (value: boolean) => void,
  onSortTypeChange: (value: string) => void,
};

export const ProductTable: React.FC<Props> = ({
  products,
  isReversed,
  sortType,
  onReverseChange,
  onSortTypeChange,
}) => (
  <table
    data-cy="ProductTable"
    className="table is-striped is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <ColumnTitles
          sortType={sortType}
          isReversed={isReversed}
          onReverseChange={onReverseChange}
          onSortTypeChange={onSortTypeChange}
        />
      </tr>
    </thead>

    <tbody>
      {products.map(({ category, user, ...product }) => (
        <tr data-cy="Product" key={product.id}>
          <td className="has-text-weight-bold" data-cy="ProductId">
            {product.id}
          </td>

          <td data-cy="ProductName">
            {product.name}
          </td>

          <td data-cy="ProductCategory">
            {`${category?.icon} - ${category?.title}`}
          </td>

          <td
            data-cy="ProductUser"
            className={classNames({
              'has-text-link': user?.sex === 'm',
              'has-text-danger': user?.sex === 'f',
            })}
          >
            {user?.name}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
