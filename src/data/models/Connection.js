import DataType from 'sequelize';
import Model from '../sequelize';

const Connection = Model.define(
  'Connection',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    fromPhone: {
      type: DataType.STRING,
    },
    toPhone: {
      type: DataType.STRING,
    }
    context: {
      type: DataType.STRING,
    }
  }
);

export default Connection;
