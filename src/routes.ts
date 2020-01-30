/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
} from "tsoa";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DatesController } from "./Services/Users/DatesController";
import * as KoaRouter from "koa-router";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  IDateDto: {
    dataType: "refObject",
    properties: {
      date: { dataType: "string", required: true },
      value: { dataType: "boolean", required: true },
      id: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IDate: {
    dataType: "refObject",
    properties: {
      date: { dataType: "string", required: true },
      value: { dataType: "boolean", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  router.get("/api/dates", async (context: any, next: any) => {
    const args = {
      months: { in: "query", name: "months", dataType: "string" },
    };

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, context);
    } catch (error) {
      context.status = error.status;
      context.throw(error.status, JSON.stringify({ fields: error.fields }));
    }

    const controller = new DatesController();

    const promise = controller.getDates.apply(controller, validatedArgs as any);
    return promiseHandler(controller, promise, context, next);
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.post("/api/dates/save", async (context: any, next: any) => {
    const args = {
      body: {
        in: "body",
        name: "body",
        required: true,
        dataType: "array",
        array: { ref: "IDate" },
      },
    };

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, context);
    } catch (error) {
      context.status = error.status;
      context.throw(error.status, JSON.stringify({ fields: error.fields }));
    }

    const controller = new DatesController();

    const promise = controller.addDate.apply(controller, validatedArgs as any);
    return promiseHandler(controller, promise, context, next);
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.post("/api/dates/delete", async (context: any, next: any) => {
    const args = {
      body: {
        in: "body",
        name: "body",
        required: true,
        dataType: "array",
        array: { dataType: "double" },
      },
    };

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, context);
    } catch (error) {
      context.status = error.status;
      context.throw(error.status, JSON.stringify({ fields: error.fields }));
    }

    const controller = new DatesController();

    const promise = controller.deleteDate.apply(
      controller,
      validatedArgs as any,
    );
    return promiseHandler(controller, promise, context, next);
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return (
      "getHeaders" in object && "getStatus" in object && "setStatus" in object
    );
  }

  function promiseHandler(
    controllerObj: any,
    promise: Promise<any>,
    context: any,
    next: () => Promise<any>,
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        if (data || data === false) {
          context.body = data;
          context.status = 200;
        } else {
          context.status = 204;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        if (isController(controllerObj)) {
          const headers = controllerObj.getHeaders();
          Object.keys(headers).forEach((name: string) => {
            context.set(name, headers[name]);
          });

          const statusCode = controllerObj.getStatus();
          if (statusCode) {
            context.status = statusCode;
          }
        }
        return next();
      })
      .catch((error: any) => {
        context.status = error.status || 500;
        context.throw(context.status, error.message, error);
      });
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, context: any): any[] {
    const errorFields: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case "request":
          return context.request;
        case "query":
          return validationService.ValidateParam(
            args[key],
            context.request.query[name],
            name,
            errorFields,
            undefined,
            {
              noImplicitAdditionalProperties: "throw-on-extras",
              specVersion: 3,
            },
          );
        case "path":
          return validationService.ValidateParam(
            args[key],
            context.params[name],
            name,
            errorFields,
            undefined,
            {
              noImplicitAdditionalProperties: "throw-on-extras",
              specVersion: 3,
            },
          );
        case "header":
          return validationService.ValidateParam(
            args[key],
            context.request.headers[name],
            name,
            errorFields,
            undefined,
            {
              noImplicitAdditionalProperties: "throw-on-extras",
              specVersion: 3,
            },
          );
        case "body":
          return validationService.ValidateParam(
            args[key],
            context.request.body,
            name,
            errorFields,
            name + ".",
            {
              noImplicitAdditionalProperties: "throw-on-extras",
              specVersion: 3,
            },
          );
        case "body-prop":
          return validationService.ValidateParam(
            args[key],
            context.request.body[name],
            name,
            errorFields,
            "body.",
            {
              noImplicitAdditionalProperties: "throw-on-extras",
              specVersion: 3,
            },
          );
      }
    });
    if (Object.keys(errorFields).length > 0) {
      throw new ValidateError(errorFields, "");
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
