import DataType from 'sequelize';
import Model from '../sequelize';

const UserApp = Model.define(
  'UserApp',
  {
    name: {
      type: DataType.STRING,
    },
  }
);
export default UserApp;
