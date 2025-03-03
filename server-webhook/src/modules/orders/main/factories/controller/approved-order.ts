import { ApprovedOrderUseCase } from "../../../data/usecases/approved-order";
import { ApprovedOrderController } from "../../../presentation/controller/approved-order";
import { Controller } from "../../../presentation/protocol/controller";
import { makeApprovedOrderUseCase } from "../data/approved-order";

export const makeApprovedOrderController = (): Controller => {
  const approvedOrder = makeApprovedOrderUseCase();
  return new ApprovedOrderController(approvedOrder);
}
