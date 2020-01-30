import { WhereOptions } from "sequelize";
import { ErrorType } from "../../common/errorType";
import { ApiError } from "../../common/handlers/errorHandler";
import { IDate, Dates } from "./DatesModel";
import { Op } from "sequelize";

export class DatesService {
  getAllDates = (months?: string[]) => {
    const whereCondition = (months || []).map((item) => ({
      date: {
        [Op.like]: `${item}-%`,
      },
    }));

    return Dates.findAll({
      attributes: ["id", "date", "value"],
      where: whereCondition.length
        ? {
            [Op.or]: whereCondition,
          }
        : {},
      order: [["createdAt", "DESC"]],
    });
  };

  getDateByAttr = (where: WhereOptions) => {
    return Dates.findOne({ where }).then(
      (result) => {
        return Promise.resolve(result);
      },
      (e) =>
        Promise.reject(
          new ApiError(
            "ServerError",
            500,
            ErrorType.DataBaseErrorException,
            e.message,
          ),
        ),
    );
  };

  addDate = (body: IDate[]) => {
    return Dates.bulkCreate(body).catch((e) =>
      Promise.reject(
        new ApiError(
          "ServerError",
          500,
          ErrorType.DataBaseErrorException,
          e.message,
        ),
      ),
    );
  };

  deleteDate = (id: number[]) => {
    const condition = id.map((item) => ({
      id: item,
    }));

    return Dates.destroy({ where: { [Op.or]: condition } }).catch((e) =>
      Promise.reject(
        new ApiError(
          "ServerError",
          500,
          ErrorType.DataBaseErrorException,
          e.message,
        ),
      ),
    );
  };
}
