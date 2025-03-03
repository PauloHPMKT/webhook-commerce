import { ApprovedOrderController } from "../../../../../modules/orders/presentation/controller/approved-order";
import { Controller } from "../../../../../shared/presentation/protocol";
import { makeApprovedOrderUseCase } from "../data/approved-order";

export const makeApprovedOrderController = (): Controller => {
  const approvedOrderUseCase = makeApprovedOrderUseCase();
  return new ApprovedOrderController(approvedOrderUseCase);
}
