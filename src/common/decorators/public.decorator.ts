import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { IS_PUBLIC } from '../constants/constants';

export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC, true);