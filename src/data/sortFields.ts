type Field = {
  name: 'ID' | 'Product' | 'Category' | 'User',
  id: number,
}
type Tuple = [ Field, Field, Field, Field];

export const sortFields: Tuple = [
  {
    name: 'ID',
    id: 1,
  },
  {
    name: 'Product',
    id: 2,
  },
  {
    name: 'Category',
    id: 3,
  },
  {
    name: 'User',
    id: 4,
  }];
