import {
  ICreateTermsAndConditionsDTO,
  IFindTermsAndConditionsDTO,
  IFindTermsAndConditionsOptions,
  IUpdateTermsAndConditionsDTO,
} from '../../domain/dtos/termsAndConditions';
import database from '../../infrastructure/database';
import messageBroker from '../../infrastructure/providers/messageBroker';
import TermsOfServiceRepository from '../../infrastructure/repositories/termsOfServiceRepository';
import CreateTermsOfServiceUseCase from '../use-cases/terms-and-conditions/create';
import DeleteTermsOfService from '../use-cases/terms-and-conditions/delete';
import DeleteManyTermsOfService from '../use-cases/terms-and-conditions/deleteMany';
import FindTermsOfService from '../use-cases/terms-and-conditions/find';
import FindManyTermsOfService from '../use-cases/terms-and-conditions/findMany';
import SoftDeleteTermsOfService from '../use-cases/terms-and-conditions/softDelete';
import SoftDeleteManyTermsOfService from '../use-cases/terms-and-conditions/softDeleteMany';
import UpddateTermsOfService from '../use-cases/terms-and-conditions/updateTermsOfService';

export default class TermsOfService {
  private readonly repo = new TermsOfServiceRepository(database.termsOfService);

  getManyTermsOfService(
    filter: IFindTermsAndConditionsDTO,
    options: IFindTermsAndConditionsOptions
  ) {
    return new FindManyTermsOfService(this.repo).execute(filter, options);
  }

  getTermsOfService(id: string) {
    return new FindTermsOfService(this.repo).execute(id);
  }

  createTermsOfService(data: ICreateTermsAndConditionsDTO) {
    return new CreateTermsOfServiceUseCase(this.repo, {
      messageBroker: messageBroker,
    }).execute(data);
  }

  updateTermsOfService(id: string, data: IUpdateTermsAndConditionsDTO) {
    return new UpddateTermsOfService(this.repo, {
      messageBroker: messageBroker,
    }).execute(id, data);
  }

  deleteTermsOfService(id: string, options?: { soft?: boolean }) {
    return options?.soft
      ? new SoftDeleteTermsOfService(this.repo, {
          messageBoker: messageBroker,
        }).execute(id)
      : new DeleteTermsOfService(this.repo, {
          messageBoker: messageBroker,
        }).execute(id);
  }

  deleteManyTermsOfService(ids: string[], options?: { soft?: boolean }) {
    return options?.soft
      ? new SoftDeleteManyTermsOfService(this.repo, {
          messageBoker: messageBroker,
        }).execute(ids)
      : new DeleteManyTermsOfService(this.repo, {
          messageBoker: messageBroker,
        }).execute(ids);
  }
}

export const termsOfServiceService = new TermsOfService();
