import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/db";
import { BaseDto } from "../../dto/BaseDto.g";

export interface IDate {
  date: string;
  value: boolean;
}

export interface IDateDto extends IDate, BaseDto {}

export class Dates extends Model {
  public date: string;
  public value: boolean;
  public id: string;

  // timestamps!
  private readonly createdAt: IDate | string;
  private readonly updatedAt: IDate | string;
}

Dates.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        len: [5, 10],
      },
    },
    value: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Dates",
    indexes: [
      {
        unique: true,
        fields: ["date"],
      },
    ],
  },
);
Dates.sync({ force: false }).then(() => {});
