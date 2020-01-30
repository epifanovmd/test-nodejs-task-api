import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { ErrorType } from "../../common/errorType";
import { ApiError } from "../../common/handlers/errorHandler";
import { IDate, IDateDto } from "./DatesModel";
import { DatesService } from "./DatesService";
import { DateTime } from "luxon";

const { addDate, deleteDate, getAllDates, getDateByAttr } = new DatesService();

const validateDate = (dates: string): boolean => {
  return dates
    .split(",")
    .every((item) => DateTime.fromFormat(item, "yyyy-LL").isValid);
};

@Tags("Dates")
@Route("api/dates")
export class DatesController extends Controller {
  @Get()
  getDates(@Query("months") months?: string): Promise<IDateDto[]> {
    try {
      const datesValid = (months && validateDate(months)) || true;
      if (!datesValid) {
        return Promise.reject(
          new ApiError(
            "Invalid months format",
            500,
            ErrorType.ValidateException,
          ),
        );
      }

      return getAllDates(months?.split(",")).then((result) => result);
    } catch (e) {
      return Promise.reject(
        new ApiError("", 500, ErrorType.DataBaseErrorException),
      );
    }
  }

  @Post("save")
  async addDate(@Body() body: IDate[]): Promise<IDateDto[]> {
    if (
      body.every(
        (item) => !DateTime.fromFormat(item.date, "yyyy-LL-dd").isValid,
      )
    ) {
      return Promise.reject(
        new ApiError("Invalid date format", 500, ErrorType.ValidateException),
      );
    }
    try {
      return addDate(body).then((result) => result);
    } catch (e) {
      return Promise.reject(
        new ApiError("Server error", 500, ErrorType.ServerErrorException),
      );
    }
  }

  @Post("delete")
  async deleteDate(@Body() body: number[]): Promise<number> {
    try {
      return deleteDate(body);
    } catch (e) {
      return Promise.reject(
        new ApiError("Server error", 500, ErrorType.ServerErrorException),
      );
    }
  }
}
