import { TermsOfService } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValueWithPagination } from "../../../../domain/valueObjects/returnValue";
import Terms, { termsOfServiceService } from "../../../../application/services/termsOfService";

export default class FindManyTermsController implements IContoller<ReturnValueWithPagination<TermsOfService[]>> {
    constructor(private readonly service: Terms) { }

    handle(request: RequestObject): Promise<ReturnValueWithPagination<TermsOfService[]>> {
        const page = request.query?.page ? Number(request.query.page) : 1;
        const limit = request.query?.limit ? Number(request.query.limit) : 10;

        return this.service.getManyTermsOfService({
            ...(request.query || {})
        }, {
            limit: !isNaN(limit) && limit > 0 ? limit : 10,
            page: !isNaN(page) && page > 0 ? page : 1,

        });
    }




}

export const findManyTermsController = new FindManyTermsController(termsOfServiceService)