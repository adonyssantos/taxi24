import { Controller, Get } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Response, response } from 'src/shared/utils/response.util';
import { Messages } from 'src/shared/constants/messages.enum';
import { Invoice } from './entities/invoice.entity';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  async findAll(): Promise<Response<Invoice[]>> {
    const invoices = await this.invoicesService.findAll();
    return response(Messages.INVOICES_RETRIEVED_SUCCESSFULLY, invoices);
  }
}
