import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getOwnerById(userId) {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

function getCategoryById(userId) {
  return categoriesFromServer.find(category => category.id === userId)
  || null;
}

const productsWithout = productsFromServer.map(product => ({
  ...product,
  category: getCategoryById(product.categoryId),
}));

const products = productsWithout.map(product => ({
  ...product,
  owner: getOwnerById(product.category.ownerId),
}));

export const App = () => {
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');

  function getProducts(someProducts, someQuery, someFilterBy) {
    let newProducts = [...someProducts];

    if (query) {
      // eslint-disable-next-line max-len
      newProducts = newProducts.filter(product => product.owner.id === someQuery);
    }

    if (someFilterBy) {
      newProducts = newProducts.filter(product =>
        // eslint-disable-next-line implicit-arrow-linebreak
        product.name.toLowerCase().includes(someFilterBy.toLowerCase()));
    }

    return newProducts;
  }

  const newProducts = getProducts(products, query, filterBy);

  // eslint-disable-next-line consistent-return
  function findSex(sex) {
    if (sex === 'm') {
      return 'has-text-link';
    }

    if (sex === 'f') {
      return 'has-text-danger';
    }
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={classNames(
                  { 'is-active': query === '' },
                )}
                onClick={() => setQuery('')}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames(
                    { 'is-active': query === user.id },
                  )}
                  onClick={() => setQuery(user.id)}
                >
                  {user.name}
                </a>

              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  value={filterBy}
                  className="input"
                  placeholder="Search"
                  onChange={event => setFilterBy(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  { filterBy === ''
                    ? null
                    : (
                      <button
                        data-cy="ClearButton"
                        type="button"
                        className="delete"
                        onClick={() => setFilterBy('')}
                      />
                    )

                  }
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setQuery('');
                  setFilterBy('');
                }
                }
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {newProducts.length !== 0
                ? (newProducts.map(product => (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">
                      {product.name}
                    </td>
                    <td data-cy="ProductCategory">
                      {`${product.category.icon} - ${product.category.title}`}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={`${findSex(product.owner.sex)}`}
                    >
                      {product.owner.name}
                    </td>
                  </tr>
                )))
                : (
                  <tr>
                    <p data-cy="NoMatchingMessage">
                      No products matching selected criteria
                    </p>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
