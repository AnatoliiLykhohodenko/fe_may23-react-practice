/* eslint-disable react/jsx-filename-extension */
import classNames from 'classnames';
import React from 'react';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { sortFields } from '../data/sortFields';

type Props = {
  sortType: string,
  isReversed: boolean,
  onReverseChange: (value: boolean) => void,
  onSortTypeChange: (value: string) => void,
}

export const ColumnTitles: React.FC<Props> = ({
  sortType,
  isReversed,
  onReverseChange,
  onSortTypeChange,
}) => {
  function sortBy(newSortType: string) {
    const firstClick = newSortType !== sortType;
    const secondClick = newSortType === sortType && !isReversed;
    const thirdClick = newSortType === sortType && isReversed;

    if (firstClick) {
      onSortTypeChange(newSortType);
      onReverseChange(false);

      return;
    }

    if (secondClick) {
      onSortTypeChange(newSortType);
      onReverseChange(true);

      return;
    }

    if (thirdClick) {
      onSortTypeChange('');
      onReverseChange(false);
    }
  }

  return (
    sortFields.map(({ name, id }) => (
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          {name}

          <a
            href="#/"
            onClick={() => sortBy(name)}
            key={id}
          >
            <span className="icon">
              <i
                data-cy="SortIcon"
                className={classNames('fas', {
                  'fa-sort': sortType !== name,
                  'fa-sort-down': sortType === name && isReversed,
                  'fa-sort-up': sortType === name && !isReversed,
                })}
              />
            </span>
          </a>
        </span>
      </th>
    ))
  );
};
