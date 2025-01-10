import {
  ICreatePolicyDTO,
  IFindPolicyDTO,
  IFindPrivacyOptions,
  IUpdatePolicyDTO,
} from '../../domain/dtos/privacyPolicy';
import database from '../../infrastructure/database';
import messageBroker from '../../infrastructure/providers/messageBroker';
import PrivacyPolicyRepository from '../../infrastructure/repositories/privacyPolicyRepository';
import CreatePolicyUseCase from '../use-cases/privacy-policy/createPolicy';
import DeletePolicies from '../use-cases/privacy-policy/deleteMany';
import DeletePolicy from '../use-cases/privacy-policy/deletePolicy';
import FindPolicies from '../use-cases/privacy-policy/findPolicies';
import FindPolicy from '../use-cases/privacy-policy/findPolicy';
import SoftDeletePolicy from '../use-cases/privacy-policy/softDelete';
import SoftDeletePolicies from '../use-cases/privacy-policy/softDeleteMany';
import UpddatePolicy from '../use-cases/privacy-policy/updatePolicy';

export default class PolicyService {
  private readonly repo = new PrivacyPolicyRepository(database.privacyPolicy);

  getPolicies(filter: IFindPolicyDTO, options: IFindPrivacyOptions) {
    return new FindPolicies(this.repo).execute(filter, options);
  }

  getPolicy(id: string) {
    return new FindPolicy(this.repo).execute(id);
  }

  createPolicy(data: ICreatePolicyDTO) {
    return new CreatePolicyUseCase(this.repo, {
      messageBroker: messageBroker,
    }).execute(data);
  }

  updatePolicy(id: string, data: IUpdatePolicyDTO) {
    return new UpddatePolicy(this.repo, {
      messageBroker: messageBroker,
    }).execute(id, data);
  }

  deletePolicy(id: string, options?: { soft?: string }) {
    return options?.soft
      ? new SoftDeletePolicy(this.repo, {
          messageBoker: messageBroker,
        }).execute(id)
      : new DeletePolicy(this.repo, { messageBoker: messageBroker }).execute(
          id
        );
  }

  deletePolicies(ids: string[], options?: { soft?: string }) {
    return options?.soft
      ? new SoftDeletePolicies(this.repo, {
          messageBoker: messageBroker,
        }).execute(ids)
      : new DeletePolicies(this.repo, { messageBoker: messageBroker }).execute(
          ids
        );
  }
}

export const policyService = new PolicyService();
